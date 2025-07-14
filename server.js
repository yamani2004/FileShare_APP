const express = require('express');
const connectDB = require('./configs/mongodBConnection');
const dotenv = require('dotenv');
const sendMail = require("./service/SendMail");
const fileUploadRoute = require("./routes/fileUploadRoute");
const authRoutes = require('./routes/authRoutes'); // <-- import router

const { shortenUrl } = require("./service/urlService"); // ✅ Fix here

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Use auth routes
app.use('/api/auth', authRoutes);
app.use("/api/files", fileUploadRoute);


// Temporary hardcoded email options
let emailOptions = {
    emailTo: "yamanisohaib4@gmail.com",
    emailFrom: process.env.MAIL_USERNAME, // use env for sender email
    link: "abcd",
    fileName: "abcd",
};

console.log("Username:", process.env.MAIL_USERNAME);
console.log("Password:", process.env.MAIL_PASSWORD);


app.use("/",fileUploadRoute);

// Route to send test mail
// app.get("/send", async (req, res) => {
//     try {
//         const originalLink = "http://localhost:5000/files/1234abcd"; // Example file link

//         const shortLink = await shortenUrl(originalLink);

//         let emailOptions = {
//             emailTo: "yamanisohaib4@gmail.com",
//             emailFrom: process.env.MAIL_USERNAME,
//             link: shortLink, // ✅ use shortened URL
//             fileName: "sample.pdf",
//             size: 1234
//         };

//         await sendMail(emailOptions);
//         res.send("✅ Mail sent with shortened link");
//     } catch (error) {
//         console.error("❌ Mail sending error:", error);
//         res.status(500).send("Failed to send mail");
//     }
// });

// Default route
// app.get("/", (req, res) => {
//     res.send("This is the home URL for our URL Shortener");
// });

// Start server
app.listen(PORT, async () => {
    await connectDB(); 
    console.log(`✅ Server is running on port ${PORT}`);
});
