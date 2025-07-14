const File = require("../models/File.js");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const cloudinary = require("../configs/CloudinaryConfig.js");
const fs = require("fs");
// const upload = multer({ dest: "./uploads/" });
const {shortenUrl} = require("../service/urlService.js");
const sendMail = require("../service/SendMail");
const upload = require("../utils/ValidateFile");

router.post("/upload",upload.single('file'),async(req,res)=>{
   try{
     const {expiry} = req.body;
     if(!req.file) return res.status(400).json({error:"No file uploaded"});
     const result = await cloudinary.uploader.upload(req.file.path,{
        resource_type:"auto",  
     });
     fs.unlinkSync(req.file.path);
     console.log(result);
     const shortId = await shortenUrl(result.url);
    //  const expiry = getExpiryDate
    const createdFile = await File.create({
        shortId,
        cloudinaryUrl:result.url,
        fileName:req.file.originalname,
        size:req.file.size,
        expiry: new Date()
        });
        await sendMail({
            emailTo: "yamanisohaib4@gmail.com",
            emailFrom: "yamanisohaib477@gmail.com",
            link: result.url,
            fileName: req.file.originalname,
            // size: req.file.size
        });
        
      console.log("File Uploaded Successfully");
     res.json({createdFile});

   }catch(err){
    console.error(err);
   }
})

module.exports = router;