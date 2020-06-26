const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const cloudinary = require("cloudinary").v2;
const geocoder = require('../modules/geocoder');
const { contentSecurityPolicy } = require('helmet');
require('../modules/uploadRestaurants');
require('../modules/cloudinary');


  module.exports = {
    async get (request, response) {

      const sessionId = request.session.sessionId;

      const session = sessionId ? await authentication.getSession(sessionId) : {};

      return response.render('uploadRestaurant.html', { userId: session.userId });
    },

    async post(request, response) {

      const restaurant = request.body;

      const { postcode } = restaurant;

      const loc = await geocoder.geocode(postcode)

      const { latitude, longitude } = loc[0];

      try {


        const result = await cloudinary.uploader.upload(request.file.path)

        const url = result.url;

        const restaurant = request.body;
  
        let newRestaurant = await create(restaurant, url)

        const sessionId = request.session.sessionId;

        const session = sessionId ? await authentication.getSession(sessionId) : {};

        if (newRestaurant) {
          return response.render('uploadRestaurant.html', { successMessage: true, userId: session.userId });
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

