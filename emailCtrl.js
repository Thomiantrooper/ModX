const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");

const sendEmailHandler = asyncHandler(async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use secure:true for port 465
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MP,
            },
        });

        let info = await transporter.sendMail({
            from: '"Hi 👻" <abc@gmail.com>',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.htm,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "An error occurred while sending the email" };
    }
});

module.exports = sendEmailHandler;
