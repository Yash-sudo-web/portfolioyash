const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 8080;
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

// Nodemailer configuration
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// Define a route to send an email
app.post("/send-email", (req, res) => {
    // Extract data from the request body or query parameters
    const { name, email, message } = req.body;
    console.log(req.body);
    // Create an email message
    let conf = {
        from: process.env.SMTP_MAIL,
        to: "ymathur123@gmail.com",
        subject: `Email from ${email}, name: ${name}`,
        text:  message ,
    };
    transporter.sendMail(conf, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return res.status(500).json({ error: 'Error sending email' });
        }

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
