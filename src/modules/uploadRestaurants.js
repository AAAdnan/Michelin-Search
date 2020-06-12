const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png'
                break; 
        }
        cb(null, file.originalname + ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb) {
        checkFileType(file, cb)
    }
}).single('inpFile');


module.exports = {
    upload
};

