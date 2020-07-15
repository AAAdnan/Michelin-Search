const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const { listReview, restaurantReviewNames } = require('../modules/reviews');
const { totalReviews } = require('../modules/reviews');
const { listRestaurantNames } = require('../modules/reviews');
const cloudinary = require("cloudinary").v2;
require('../modules/uploadRestaurants');

  module.exports = {
    async get (request, response) {

    const sessionId = request.session.sessionId;
    const session = sessionId ? await authentication.getSession(sessionId) : {};

    let userId = session.userId;

    const [ allRestaurants ] = await Promise.all([list()])

    const { page = 1 } = request.query;

    const reviews  = await listReview(page)

    const restaurantNames = await restaurantReviewNames();

    console.log(restaurantNames)

    const totalPages = await totalReviews();

    return response.render('reviews.html', { userId, restaurants: allRestaurants, reviews, page, totalPages, restaurantNames } );

  },
  
}
