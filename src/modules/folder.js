const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

async function base64_encode (file) {
    let bitmap = await fs.readFile(file, 'utf-8');
    return new Buffer(bitmap).toString('base64');
}

const storage = multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname )
    }
})

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
}).single('myImage');


module.exports = {
    upload,
    base64_encode
};



