const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post('/send-email', (req, res) => {
    const { name, email, comment } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        host: 'smtps.udag.de',
        port: 465,
        secure: true,
        auth: {
            user: 'sender@routime.de',
            pass: '$3TndtGvz629'
        }
    });

    const mailOptions = {
        from: 'sender@routime.de',
        to: 'info@routime.de',
        subject: 'Contact Us Form Submission from Website',
        text: `From: ${email}\n\nName: ${name}\n\nComment: ${comment}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error: could not send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
