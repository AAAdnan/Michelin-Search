const Review  = require('../persistence/reviews');

const listReview = async (page) => {

  const results = await Review.listReview(page);

  // const restaurant_names = restaurant_ids.forEach(async function(id){
  //   const promises = await Review.findRestaurantName();
  //   console.log(promises)
  // })

  const restaurant_ids = results.map(result => result.restaurant_id)


  return results;
} 

const restaurantReviewNames = async () => {

  const restaurant_names = await Review.findRestaurantName();

  return restaurant_names;

}

const totalReviews = async () => {

  const totalReviewNumber = await Review.totalReviews();

  const lastPage = Math.round(totalReviewNumber/4)
  
  return lastPage;

}

module.exports={
   listReview,
   restaurantReviewNames,
   totalReviews
}