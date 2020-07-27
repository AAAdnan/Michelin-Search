const userId = require('../pages/dashboard');
const authentication = require('../modules/authentication');
const { list } = require('../modules/restaurants');
const { create } = require('../modules/restaurants');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const { listReview, restaurantReviewNames, deleteReview, totalReviewsNumber, selectReview, totalReviewRatings } = require('../modules/reviews');
const { listRestaurantNames } = require('../modules/reviews');
const cloudinary = require("cloudinary").v2;
require('../modules/uploadRestaurants');

  module.exports = {
    async get (request, response) {

    const sessionId = request.session.sessionId;
    const session = sessionId ? await authentication.getSession(sessionId) : {};

    let userId;

    session.userId ? userId = session.userId : userId = null;

    const [ allRestaurants ] = await Promise.all([list()])

    const { page = 1 } = request.query;

    const pageInt = parseInt(page,10);

    const reviews  = await listReview(pageInt, userId);

    const { restaurant, rating } = request.query;

    const selectedReviews = await selectReview(restaurant || '', rating || '');

    const restaurantNames = await restaurantReviewNames();

    const ratingsSet = await totalReviewRatings();

    const totalPages = await totalReviewsNumber();

    return response.render('reviews.html', { userId, restaurants: allRestaurants, reviews, pageInt, totalPages: totalPages , restaurantNames, selectedReviews: selectedReviews, selectedRestaurant: restaurant, ratingsSet: ratingsSet } );

  },

  async post (request, response) {

    const sessionId = request.session.sessionId;
    const session = sessionId ? await authentication.getSession(sessionId) : {};

    let userId = session.userId;

    let recordID = request.body.recordID;

    const deletedCount = await deleteReview(recordID, userId);

    if (deletedCount == 0) {
      return response.status(404).send();
    }

    return response.redirect('/reviews');
    
  }
  
}
