const nodemailer = require('nodemailer');

module.exports = {
    sendMail: async (user) => {
        try {
            const transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASS
                }
            });

            const mailOptions = {
                from: '"RSP-TEST" <rsp@example.com>',
                to: user,
                subject: 'Room Booking Details',
                text: 'Hello! This is your details for your booking on our room!'
            }

            transport.sendMail(mailOptions, () => { });
        } catch (e) {
            // handle errors here
            res.json(e);
        }
    },
};