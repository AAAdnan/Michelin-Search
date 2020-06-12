const { upload, base64_encode } = require('../modules/folder');

module.exports = {
    async post(request,response) {
                if (request.file === undefined){
                    console.log('unselected' + request.file)
                    response.render('folder.html', {
                        msg: 'Error: No File Selected'
                    });
                } else {
                    const encoded = await base64_encode(request.file.path);
                    response.render('folder.html', {
                        msg: 'File Uploaded!',
                        file: encoded
                    })
                }
         }
}
