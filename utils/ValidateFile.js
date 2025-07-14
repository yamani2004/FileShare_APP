const multer = require("multer");
const path = require("path");

const upload = multer({
    dest:'./uploads/',
    limits: {fileSize: 5*1024*1024},
    fileFilter(req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if(extname && mimetype) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images and pdf files are allowed!'), false);
        }
    }
});

module.exports = upload;