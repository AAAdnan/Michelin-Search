const Review  = require('../persistence/reviews');

const totalReviewRatings = async() => {

  const totalResults = await Review.totalReviews();

  let ratingSet = new Set(totalResults.map(item => item.rating));

  let ratingSetArray = Array.from(ratingSet);

  return ratingSetArray;
}
const listReview = async (page, userId) => {

  const results = await Review.listReview(page,userId);

  return results;
} 

const selectReview = async (name, rating) => {
  const selectedReview = await Review.selectReview(name, rating);

  return selectedReview;
}

const restaurantReviewNames = async () => {

  const restaurants = await Review.findRestaurantName();

  let namesSet = new Set(restaurants.map(item => item.name));

  let namesSetArray = Array.from(namesSet);

  return namesSetArray

}

const restaurantReviewRatings = async () => {

  const ratings = await Review.findRestaurantName();

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
   totalReviewsNumber,
   totalReviewRatings
}