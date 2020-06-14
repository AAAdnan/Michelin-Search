const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');

// const cloudinary = require("cloudinary").v2;

  module.exports = {
    async get (request, response) {


      const sessionId = request.session.sessionId;

      const session = sessionId ? await authentication.getSession(sessionId) : {};

      return response.render('uploadRestaurant.html', { userId: session.userId });
    },

    async post(request, response) {

      // const result = await cloudinary.uploader.upload(req.file.path)

      // console.log(result);

      const restaurant = request.body;

      let newRestaurant = await create(restaurant)

    }
  }
  


  