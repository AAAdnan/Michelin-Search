const userId = require('../pages/dashboard');

module.exports = {
  async get (request, response) {

  return response.render('reviews.html', { userId } );
}

}
