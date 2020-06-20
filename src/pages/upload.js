const { upload, base64_encode } = require('../modules/multer');

module.exports = {
    async post(request,response) {

        try {
            const result = await cloudinary.uploader.upload(request.file.path)
    
            const url = result.url;
    
            const restaurant = request.body;
    
            const sessionId = request.session.sessionId;
    
            const session = sessionId ? await authentication.getSession(sessionId) : {};
    
            if (newRestaurant) {
              return response.render('review.html', { successMessage: true, userId: session.userId });
            }
          }
          catch (error) {
            console.error(`POST /login >> Error: ${error.stack}`);
            return response
              .status(500)
              .render('500.html', {message: error.toString()});
        }
    }
}