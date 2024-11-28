const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('./config.cloudinary');

const storage = (destination = '') =>
    new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            return {
                folder: `Airbnb-Clone${destination}`,
                public_id: file.originalname.split('.')[0],
            };
        },
    });

const upload = multer({ storage: storage });
const uploadUser = multer({ storage: storage('/UserImages') });

module.exports = {
    upload,
    uploadUser,
};
