const Review  = require('../persistence/reviews');

const listReview = async (page) => {

  const results = await Review.listReview(page);

  return results;
} 

const selectReview = async (name) => {
  const selectedReview = await Review.selectReview(name);

  return selectedReview;
}


const restaurantReviewNames = async () => {

  const restaurants = await Review.findRestaurantName();

  let namesSet = new Set(restaurants.map(item => item.name));

  let namesSetArray = Array.from(namesSet);

  return namesSetArray

}

const totalReviewsNumber = async () => {

  const totalReviews = await Review.totalReviews();

  return Math.round((totalReviews.length)/4);

}

const deleteReview = async (id, userId) => {

  return Review.deleteReview(id, userId);

}

module.exports={
   listReview,
   restaurantReviewNames,
   deleteReview,
   selectReview,
   totalReviewsNumber
}