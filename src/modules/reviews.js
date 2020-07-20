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

  console.log('this is restaurants' + restaurants)

  let namesSet = new Set(restaurants.map(item => item.name));

  let namesSetArray = Array.from(namesSet);

  return namesSetArray

}

const totalReviews = async () => {

  const totalReviews = await Review.totalReviews();

  return totalReviews;

}

const deleteReview = async (id, userId) => {

  return Review.deleteReview(id, userId);

}

module.exports={
   listReview,
   restaurantReviewNames,
   deleteReview,
   selectReview,
   totalReviews
}