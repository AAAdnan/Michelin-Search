const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { find } = require('../modules/restaurants');
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

      var url = []

      try {

        if(request.file) {
          const result = await cloudinary.uploader.upload(request.file.path)
          var url = result.url
        }

        const restaurant = request.body;

        const sessionId = request.session.sessionId;

        const session = sessionId ? await authentication.getSession(sessionId) : {};

        // if(await list(restaurant.location) && await find(restaurant.name)){
        //   return response.render('uploadRestaurant.html', { duplicateMessage: true, userId: session.userId})
        // }

        console.log(url)
  
        let newRestaurant = await create(restaurant, url, latitude, longitude)

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

