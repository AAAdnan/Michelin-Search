const home = require('./home');
const about = require('./about');
const dashboard = require('./dashboard');
const signup = require('./signup');
const logout = require('./logout')
const review = require('./uploadReview');
const uploadRestaurant = require('./uploadRestaurant');
const reviews = require('./reviews');


module.exports = {
  home,
  about,
  signup,
  logout,
  review,
  reviews,
  uploadRestaurant,
  dashboard
};
