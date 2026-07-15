const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post("/", async (req, res) => {
    try {

        const {
            name,
            email,
            company,
            phone,
            message,
            source_page,
        } = req.body;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: process.env.TO_EMAIL,

            subject: "New Contact Form Submission",

            html: `
                <h2>New Contact Request</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Company:</b> ${company}</p>

                <p><b>Phone:</b> ${phone}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>

                <p><b>Source:</b> ${source_page}</p>
            `,
        });

        res.json({
            success: true,
            message: "Mail sent successfully",
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to send mail",
        });
    }
});

module.exports = router;