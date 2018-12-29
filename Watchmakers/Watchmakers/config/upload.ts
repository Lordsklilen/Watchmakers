var multer = require('multer');

var Storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "./Watchmakers/Watchmakers/public/upload");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
});

module.exports = upload;