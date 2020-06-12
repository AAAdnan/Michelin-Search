const { create } = require('../modules/restaurants')
const { createReview } = require('../modules/reviews')
const { sessionId } = require('../pages/login')
const authentication = require('../modules/authentication');
const userId = require('../pages/dashboard');

module.exports = {
  async get (request, response) {

  let findIt = request.session.sessionId;

  const sessionId = request.session.sessionId;
  const session = sessionId ? await authentication.getSession(sessionId) : {};

  let userId = session.userId;

  return response.render('folder.html', { userId });
},
    async post(request, response){

      const review = request.body;

      let newRestaurantReview = await create(review);

      let newReview = await createReview(review, userId);

    }
}
