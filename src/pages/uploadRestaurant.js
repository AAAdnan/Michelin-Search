const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const cloudinary = require("cloudinary").v2;
require('../modules/uploadRestaurants');

  module.exports = {
    async get (request, response) {

      const sessionId = request.session.sessionId;

      const session = sessionId ? await authentication.getSession(sessionId) : {};

      return response.render('uploadRestaurant.html', { userId: session.userId });
    },

    async post(request, response) {

      try {
        const result = await cloudinary.uploader.upload(request.file.path)

        const url = result.url;

        const restaurant = request.body;
  
        let newRestaurant = await create(restaurant, url)

        if (newRestaurant) {
          return response.render('uploadRestaurant.html', { successMessage: true });
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
