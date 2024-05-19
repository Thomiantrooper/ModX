const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/")); // Destination directory for uploaded images
    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniquesuffix + ".jpg");
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

const productImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat("jpg")
                .jpeg({ quality: 90 })
                .toFile(`public/images/products/${file.filename}`); // Save resized image to products directory
            fs.unlinkSync(file.path); // Remove the original uploaded image
        })
    );
    next();
};

const blogImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat("jpg")
                .jpeg({ quality: 90 })
                .toFile(`public/images/blogs/${file.filename}`); // Save resized image to blogs directory
            fs.unlinkSync(file.path); // Remove the original uploaded image
        })
    );
    next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
