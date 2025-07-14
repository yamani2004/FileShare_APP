require('dotenv').config(); // add this line at the top just to be safe

const transporter = require("../configs/Mailer");

const sendMail = async ({ emailTo, emailFrom, link, fileName }) => {
    await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        subject: "Download File",
        text: `Click on the link to download your file: ${link}\nFile Name: ${fileName}\n`,
    }, function(err, data) {
        if (err) {
            console.log("❌ Error:", err);
        } else {
            console.log(`✅ Email Sent Successfully to: ${emailTo}`);
        }
    });
};

module.exports = sendMail;
