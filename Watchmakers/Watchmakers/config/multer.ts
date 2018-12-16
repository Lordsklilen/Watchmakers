var multer = require('multer');

var Storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "./Images");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3);

module.exports = upload;