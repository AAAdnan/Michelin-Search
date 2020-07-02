const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const { listReview } = require('../modules/reviews');
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

    const allReviews  = await listReview()

    console.log(allReviews);

    return response.render('reviews.html', { userId, cities , names, restaurants: allRestaurants, allReviews } );

  },
  
}
