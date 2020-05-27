const { upload, base64_encode } = require('../modules/folder');
const userId = require('../pages/dashboard');


module.exports = {
  async get (request, response) {
  return response.render('folder.html', { userId });
},
async post(request,response) {
    upload(request, response, async (error) => {
      console.log(request.file)
        if(error) {
            response.render('folder.html', {
                msg: error
            });
        } else {
            if (request.file === undefined){
                response.render('index', {
                    msg: 'Error: No File Selected'
                });
            } else {
                const encoded = await base64_encode(request.file.path);
                console.log(encoded)
                response.render('folder.html', {
                    msg: 'File Uploaded!',
                    file: `/uploads/${request.file.filename}`
                })
            }
        }
    })
  }
}