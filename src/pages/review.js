const { create } = require('../modules/restaurants')
const { createReview } = require('../modules/reviews')
const { sessionId } = require('../pages/login')
const authentication = require('../modules/authentication');
const userId = require('../pages/dashboard');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const { list } = require('../modules/restaurants');

module.exports = {
  async get (request, response) {

  let findIt = request.session.sessionId;

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
    async post(request, response){

      const review = request.body;

      console.log(review)

      // let newRestaurantReview = await create(review);

      // let newReview = await createReview(review, userId);

    }
}
