/* eslint-disable prettier/prettier */
const express = require("express");
const nodemailer = require("nodemailer");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

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
        const primaryKeys = new Set(["name", "email", "company", "phone", "message", "source_page", "form_id"]);
        let filteredExtras = {};
        if (rest && typeof rest === 'object') {
            // If client sent a `payload` object, prefer its extra keys
            if (rest.payload && typeof rest.payload === 'object' && !Array.isArray(rest.payload)) {
                const p = rest.payload;
                // Include only keys from payload that are not identical duplicates of top-level fields
                Object.entries(p).forEach(([k, v]) => {
                    if (!primaryKeys.has(k)) {
                        filteredExtras[k] = v;
                    }
                });
            }
            // Also include any other keys in rest that are not primary keys and not the payload wrapper
            Object.entries(rest).forEach(([k, v]) => {
                if (k === 'payload') return;
                if (!primaryKeys.has(k)) filteredExtras[k] = v;
            });
        }

        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
            console.log(`/api/public contact endpoint received body for ${emailSubjectTitle}:`, JSON.stringify(req.body));
        }

        const missing = [];
        if (!name) missing.push('name');
        if (!email) missing.push('email');
        if (!message) missing.push('message');
        if (missing.length) {
            console.warn('Contact submission missing required fields:', missing);
            return res.status(400).json({ success: false, message: 'Missing required fields', missing });
        }

        let dbInserted = false;
        try {
            const result = await pool.query(
                `INSERT INTO visionaize.contact_submissions (name, email, company, phone, message, source_page, payload, ip, user_agent)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
                [
                    name || null,
                    email || null,
                    company || null,
                    phone || null,
                    message || null,
                    source_page || form_id || null,
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
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(name)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Email</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(email)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Company</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(company)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Phone</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(phone)}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;vertical-align:top;background:#f7fafc">Message</td>
                                        <td style="border:1px solid #333;padding:8px;white-space:pre-wrap;word-break:break-word;background:#ffffff">${escapeHtml(message || '')}</td>
                                    </tr>
                                    <tr>
                                        <td style="border:1px solid #333;padding:8px;font-weight:600;background:#f7fafc">Source</td>
                                        <td style="border:1px solid #333;padding:8px;word-break:break-word;white-space:normal;background:#ffffff">${escapeHtml(source_page || form_id || '')}</td>
                                    </tr>
                                    ${renderKeyValueRows(filteredExtras)}
                                </tbody>
                            </table>
                        </div>
                `;

        try {
            await transporter.sendMail({
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
                await transporter.sendMail(userMail);
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
            const result = await pool.query('SELECT id, name, email, company, phone, message, source_page, payload, created_at FROM visionaize.contact_submissions ORDER BY created_at DESC LIMIT 10');
            res.json({ success: true, items: result.rows });
        } catch (err) {
            console.error('Failed to fetch recent submissions (backend):', err && err.message ? err.message : err);
            res.status(500).json({ success: false, message: 'Unable to fetch recent submissions' });
        }
    });
}