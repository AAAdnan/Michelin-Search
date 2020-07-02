const Review  = require('../persistence/reviews');

const listReview = async (name) => {

  const results = await Review.listReview(name);

  return results;

}

module.exports={
   listReview
}