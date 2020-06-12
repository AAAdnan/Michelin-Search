const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { create } = require('../modules/restaurants')
const { upload } = require('../modules/folder');

  module.exports = {
    async get (request, response) {


      const sessionId = request.session.sessionId;

      const session = sessionId ? await authentication.getSession(sessionId) : {};

      return response.render('uploadRestaurant.html', { userId: session.userId });
    },

    async post(request, response) {

      const restaurant = request.body;

      console.log(restaurant)

      let newRestaurant = await create(restaurant)

    }
  }
  


  