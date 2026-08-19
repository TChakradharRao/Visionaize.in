/* eslint-disable prettier/prettier */
const express = require("express");
const nodemailer = require("nodemailer");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const smtpTransporter = process.env.MAIL_PROVIDER === "smtp" || (!process.env.MICROSOFT_TENANT_ID && !process.env.MICROSOFT_CLIENT_ID && !process.env.MICROSOFT_CLIENT_SECRET)
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    : null;

async function getMicrosoftGraphAccessToken() {
    const tenantId = process.env.MICROSOFT_TENANT_ID;
    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

    if (!tenantId || !clientId || !clientSecret) {
        throw new Error("Missing Microsoft Graph credentials. Set MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, and MICROSOFT_CLIENT_SECRET.");
    }

    const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            scope: "https://graph.microsoft.com/.default",
            grant_type: "client_credentials",
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Microsoft Graph token request failed: ${response.status} ${errorText}`);
    }

    const tokenData = await response.json();
    if (!tokenData || !tokenData.access_token) {
        throw new Error("Microsoft Graph token response did not include an access token.");
    }

    return tokenData.access_token;
}

function buildGraphAttachments(attachments) {
    if (!Array.isArray(attachments) || !attachments.length) return [];

    return attachments.map((attachment) => {
        let contentBytes = attachment.contentBytes || "";

        if (!contentBytes && attachment.path) {
            if (/^https?:\/\//i.test(attachment.path)) {
                throw new Error(`Remote attachment URLs are not supported by the Microsoft Graph mail transport: ${attachment.path}`);
            }
            contentBytes = fs.readFileSync(attachment.path, { encoding: "base64" });
        }

        return {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: attachment.filename || attachment.name || "attachment",
            contentType: attachment.contentType || "application/octet-stream",
            contentBytes,
        };
    });
}

async function sendMail(message) {
    const fromAddress = message.from || process.env.EMAIL_USER || process.env.MAIL_FROM;
    const mailPayload = { ...message, from: fromAddress };

    if (smtpTransporter) {
        return smtpTransporter.sendMail(mailPayload);
    }

    const accessToken = await getMicrosoftGraphAccessToken();
    const recipients = Array.isArray(mailPayload.to) ? mailPayload.to : [mailPayload.to];
    const mailbox = process.env.MICROSOFT_MAILBOX || fromAddress;

    const graphPayload = {
        message: {
            subject: mailPayload.subject,
            body: {
                contentType: mailPayload.html ? "HTML" : "Text",
                content: mailPayload.html || mailPayload.text || "",
            },
            toRecipients: recipients.map((recipient) => ({ emailAddress: { address: recipient } })),
            from: { emailAddress: { address: fromAddress } },
        },
        saveToSentItems: true,
    };

    if (mailPayload.attachments && mailPayload.attachments.length) {
        graphPayload.message.attachments = buildGraphAttachments(mailPayload.attachments);
    }

    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(graphPayload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        const message = response.status === 403
            ? `Microsoft Graph sendMail failed: ${response.status} ${errorText}. Grant the app the Mail.Send application permission with admin consent and assign Send As / Send on behalf permissions to mailbox ${mailbox}.`
            : `Microsoft Graph sendMail failed: ${response.status} ${errorText}`;
        throw new Error(message);
    }
}

// Postgres pool using DATABASE_URL from backend/.env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Check DB config early and attempt a quick connection to surface errors on startup
if (!process.env.DATABASE_URL) {
    console.warn("WARNING: DATABASE_URL is not set in backend/.env or environment. DB inserts will fail.");
} else {
    pool.connect()
        .then((client) => {
            client.release();
            console.log("Postgres pool connected (backend)");
        })
        .catch((err) => {
            console.error("Postgres connection failed (backend):", err && err.message ? err.message : err);
        });
}

async function processSubmission(req, res, emailSubjectTitle) {
    try {
        const {
            name,
            email,
            company,
            phone,
            message,
            source_page,
            form_id,
            ...rest
        } = req.body;

        // Remove duplicated data from nested `payload` if it only repeats top-level fields.
        // We'll store and display only the extra keys so the email and DB don't repeat name/email/etc.
        // const primaryKeys = new Set(["name", "email", "company", "phone", "message", "source_page", "form_id"]);
        // let filteredExtras = {};
        // if (rest && typeof rest === 'object') {
        //     // If client sent a `payload` object, prefer its extra keys
        //     if (rest.payload && typeof rest.payload === 'object' && !Array.isArray(rest.payload)) {
        //         const p = rest.payload;
        //         // Include only keys from payload that are not identical duplicates of top-level fields
        //         Object.entries(p).forEach(([k, v]) => {
        //             if (!primaryKeys.has(k)) {
        //                 filteredExtras[k] = v;
        //             }
        //         });
        //     }
        //     // Also include any other keys in rest that are not primary keys and not the payload wrapper
        //     Object.entries(rest).forEach(([k, v]) => {
        //         if (k === 'payload') return;
        //         if (!primaryKeys.has(k)) filteredExtras[k] = v;
        //     });
        // }
        const aliasMap = {
            first_name: 'name',
            last_name: 'name',
            full_name: 'name',
            fullname: 'name',
            company_name: 'company',
            business_email: 'email',
            work_email: 'email',
            phone_number: 'phone',
            contact_number: 'phone',
            mobile: 'phone',
            mobile_number: 'phone',
        };

        const primaryKeys = new Set(["name", "email", "company", "phone", "message", "source_page", "form_id"]);

        function sanitizeFieldValue(value) {
            if (value === null || value === undefined) return null;
            if (typeof value === 'string') {
                const trimmed = value.trim();
                return trimmed || null;
            }
            return value;
        }

        function normalizeValue(value) {
            if (typeof value === 'string') {
                return value.trim().replace(/\s+/g, ' ').toLowerCase();
            }
            return value;
        }

        const safeName = sanitizeFieldValue(name);
        const safeEmail = sanitizeFieldValue(email);
        const safeCompany = sanitizeFieldValue(company);
        const safePhone = sanitizeFieldValue(phone);
        const safeMessage = sanitizeFieldValue(message);
        const safeSourcePage = sanitizeFieldValue(source_page || form_id || null);

        const topValuesNormalized = {
            name: normalizeValue(safeName),
            email: normalizeValue(safeEmail),
            company: normalizeValue(safeCompany),
            phone: normalizeValue(safePhone),
            message: normalizeValue(safeMessage),
            source_page: normalizeValue(safeSourcePage),
        };

        const rawPayload = rest && typeof rest === 'object' && rest.payload && typeof rest.payload === 'object' && !Array.isArray(rest.payload)
            ? rest.payload
            : null;

        const filteredExtras = {};
        const aliasValues = { name: null, email: null, company: null, phone: null };

        function recordAliasValue(key, value) {
            const normalizedKey = String(key).toLowerCase();
            const target = aliasMap[normalizedKey];
            if (!target) return;
            const sanitized = sanitizeFieldValue(value);
            if (!sanitized) return;
            if (!aliasValues[target]) aliasValues[target] = sanitized;
        }

        function isDuplicateTopLevel(key, value) {
            const normalizedKey = String(key).toLowerCase();
            const normalizedValue = normalizeValue(value);
            if (normalizedValue === null || normalizedValue === undefined || normalizedValue === '') return true;
            if (primaryKeys.has(normalizedKey)) {
                return normalizedValue === topValuesNormalized[normalizedKey];
            }
            if (aliasMap[normalizedKey]) {
                return normalizedValue === topValuesNormalized[aliasMap[normalizedKey]];
            }
            return false;
        }

        if (rawPayload) {
            Object.entries(rawPayload).forEach(([k, v]) => {
                const normalizedKey = String(k).toLowerCase();
                if (aliasMap[normalizedKey]) {
                    recordAliasValue(normalizedKey, v);
                    return;
                }
                if (primaryKeys.has(normalizedKey)) return;
                if (v === undefined || v === null) return;
                if (typeof v === 'string' && !v.trim()) return;
                if (isDuplicateTopLevel(normalizedKey, v)) return;
                filteredExtras[k] = v;
            });
        }

        Object.entries(rest).forEach(([k, v]) => {
            if (k === 'payload') return;
            const normalizedKey = String(k).toLowerCase();
            if (aliasMap[normalizedKey]) {
                recordAliasValue(normalizedKey, v);
                return;
            }
            if (primaryKeys.has(normalizedKey)) return;
            if (v === undefined || v === null) return;
            if (typeof v === 'string' && !v.trim()) return;
            if (isDuplicateTopLevel(normalizedKey, v)) return;
            filteredExtras[k] = v;
        });

        const resolvedName = safeName || aliasValues.name;
        const resolvedEmail = safeEmail || aliasValues.email;
        const resolvedCompany = safeCompany || aliasValues.company;
        const resolvedPhone = safePhone || aliasValues.phone;
        const resolvedSourcePage = safeSourcePage;

        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
            console.log(`/api/public contact endpoint received submission for ${emailSubjectTitle}:`, JSON.stringify({
                name: resolvedName,
                email: resolvedEmail,
                company: resolvedCompany,
                phone: resolvedPhone,
                message,
                source_page: resolvedSourcePage || form_id || null,
                payload: filteredExtras,
            }));
        }

        const missing = [];
        if (!resolvedName) missing.push('name');
        if (!resolvedEmail) missing.push('email');
        if (!message) missing.push('message');
        if (missing.length) {
            console.warn('Contact submission missing required fields:', missing);
            return res.status(400).json({ success: false, message: 'Missing required fields', missing });
        }

        let dbInserted = false;
        try {
            const result = await pool.query(
                `INSERT INTO public.contact_submissions (name, email, company, phone, message, source_page, payload, ip, user_agent)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
                [
                    resolvedName || null,
                    resolvedEmail || null,
                    resolvedCompany || null,
                    resolvedPhone || null,
                    message || null,
                    resolvedSourcePage || form_id || null,
                    filteredExtras && Object.keys(filteredExtras).length ? filteredExtras : {},
                    req.ip,
                    req.headers["user-agent"] || null,
                ]
            );
            if (result && result.rows && result.rows[0] && result.rows[0].id) {
                dbInserted = true;
                console.log("DB insert succeeded (backend), id:", result.rows[0].id);
            }
        } catch (dbErr) {
            console.error("DB insert failed (backend):", dbErr && dbErr.message ? dbErr.message : dbErr);
            if (dbErr && dbErr.detail) console.error("DB detail:", dbErr.detail);
            if (dbErr && dbErr.code) console.error("DB code:", dbErr.code);
        }

        // Send email
                const subject = emailSubjectTitle || (() => {
                        const url = String(req.baseUrl || req.originalUrl || '').toLowerCase();
                        if (url.includes('/whitepaper')) return 'New Whitepaper Requested';
                        if (url.includes('/case-study') || url.includes('/case-study')) return 'New Case Study Requested';
                        return 'New Contact Form Submission';
                })();

                function escapeHtml(str) {
                        if (str === null || str === undefined) return '';
                        return String(str)
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&#39;');
                }

                function humanizeKey(key) {
                        return String(key)
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (match) => match.toUpperCase());
                }

                function renderKeyValueRows(obj) {
                        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return '';
                        return Object.entries(obj)
                                .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
                                .map(([k, v]) => {
                                        const value = typeof v === 'object' ? JSON.stringify(v) : String(v);
                                        return `<tr><td style="border:1px solid #333;padding:8px;font-weight:600;vertical-align:top;background:#f7fafc">${escapeHtml(humanizeKey(k))}</td><td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(value)}</td></tr>`;
                                })
                                .join('');
                }

                const html = `
                        <div style="font-family:Arial,Helvetica,sans-serif;color:#111;">
                            <h2 style="margin-bottom:8px;">${escapeHtml(subject)}</h2>
                            <table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;max-width:800px;border:1px solid #333;">
                                <tbody>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;width:160px;background:#f7fafc">Name</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(resolvedName)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Email</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(resolvedEmail)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Company</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(resolvedCompany)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Phone</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(resolvedPhone)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;vertical-align:top;background:#f7fafc">Message</td>
                                        <td style="border:1px solid #333;padding:8px;white-space:pre-wrap;word-break:break-word;background:#ffffff">${escapeHtml(message || '')}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Source</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(resolvedSourcePage || '')}</td>
                                    </tr>
                                    ${renderKeyValueRows(filteredExtras)}
                                </tbody>
                            </table>
                        </div>
                `;

        try {
            await sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.TO_EMAIL,
                subject,
                html,
            });
        } catch (mailErr) {
            console.error('Failed to send notification email (backend):', mailErr && mailErr.message ? mailErr.message : mailErr);
        }

        if (String(req.baseUrl || req.originalUrl || '').toLowerCase().includes('/whitepaper') && process.env.EMAIL_USER) {
            const attachments = [];
            const localPath = process.env.WHITEPAPER_FILE_PATH || path.join(__dirname, '..', 'public', 'whitepaper.pdf');
            if (process.env.WHITEPAPER_FILE_PATH && fs.existsSync(process.env.WHITEPAPER_FILE_PATH)) {
                attachments.push({ filename: path.basename(process.env.WHITEPAPER_FILE_PATH), path: process.env.WHITEPAPER_FILE_PATH });
            } else if (!process.env.WHITEPAPER_FILE_PATH && fs.existsSync(localPath)) {
                attachments.push({ filename: path.basename(localPath), path: localPath });
            } else if (process.env.WHITEPAPER_URL) {
                attachments.push({ filename: path.basename(process.env.WHITEPAPER_URL), path: process.env.WHITEPAPER_URL });
            } else {
                console.warn(`Whitepaper attachment not available. Set WHITEPAPER_FILE_PATH or WHITEPAPER_URL to include the document in the user email.`);
            }

            const userMail = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Visionaize Whitepaper',
                html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#111;"><h2>Hello ${escapeHtml(name)}</h2><p>Thanks for requesting the whitepaper. Please find the attached document.</p></div>`,
            };
            if (attachments.length) userMail.attachments = attachments;

            try {
                await sendMail(userMail);
            } catch (userMailErr) {
                console.error('Failed to send whitepaper to user email (backend):', userMailErr && userMailErr.message ? userMailErr.message : userMailErr);
            }
        }

        const responsePayload = { success: true, message: "Received submission" };
        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
            responsePayload.dbInserted = dbInserted;
        }
        res.json(responsePayload);

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Unable to process submission" });
    }
}

router.post("/", async (req, res) => processSubmission(req, res, "New Contact Form Submission"));

// Support specific endpoints for case study and whitepaper requests so frontend can post directly to them.
router.post("/case-study", async (req, res) => processSubmission(req, res, "New Case Study Request"));
router.post("/whitepaper", async (req, res) => processSubmission(req, res, "New Whitepaper Request"));

module.exports = router;

// Dev-only: recent submissions endpoint for quick verification
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    router.get('/recent', async (req, res) => {
        try {
            const result = await pool.query('SELECT id, name, email, company, phone, message, source_page, payload, created_at FROM public.contact_submissions ORDER BY created_at DESC LIMIT 10');
            res.json({ success: true, items: result.rows });
        } catch (err) {
            console.error('Failed to fetch recent submissions (backend):', err && err.message ? err.message : err);
            res.status(500).json({ success: false, message: 'Unable to fetch recent submissions' });
        }
    });
}