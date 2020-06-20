const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const cloudinary = require("cloudinary").v2;
require('../modules/uploadRestaurants');

  module.exports = {
    async get (request, response) {

    const sessionId = request.session.sessionId;
    const session = sessionId ? await authentication.getSession(sessionId) : {};

    let userId = session.userId;

    const { city } = request.query;

    const [ restaurants, allRestaurants ] = await Promise.all( [list(city), list()] )

    const cities = await getCities(
      allRestaurants.map(element => element.location )
    );

    const names = await getNames(
      allRestaurants.map(element => element.name)
    )

    return response.render('review.html', { userId, cities , names, restaurants: allRestaurants } );

  },
  
    async post(request, response) {

      try {
        const result = await cloudinary.uploader.upload(request.file.path)

        const url = result.url;

        const review = request.body;

        //review, courses, images, meal names
  
        let newReview = await create(review, url)

        const sessionId = request.session.sessionId;

        const session = sessionId ? await authentication.getSession(sessionId) : {};

        if (newReview) {
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
