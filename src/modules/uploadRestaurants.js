const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/restaurants')
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

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(path.extname
        (file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb) {
        checkFileType(file, cb)
    }
}).single('inpFile');


module.exports = {
    upload
};

