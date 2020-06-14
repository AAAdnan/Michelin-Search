const { upload, base64_encode } = require('../modules/multer');

module.exports = {
    async post(request,response) {
                if (request.file === undefined){
                    console.log('unselected' + request.file)
                    response.render('review.html', {
                        msg: 'Error: No File Selected'
                    });
                } else {
                    const encoded = await base64_encode(request.file.path);
                    response.render('review.html', {
                        msg: 'File Uploaded!',
                        file: encoded
                    })
                }
         }
}