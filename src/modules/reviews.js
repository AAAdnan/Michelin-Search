const User = require('../persistence/users');
const Restaurant  = require('../persistence/restaurants');
const Session = require('../persistence/sessions.js');
const Review = require('../persistence/reviews');

async function createReview(review, userId) {
  const newReview = await Review.create(review, userId)

  return newReview;
};

module.exports = {
  createReview
}