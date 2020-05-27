const { getCities } = require('../modules/cities')
const { list } = require('../modules/restaurants')
const authentication = require('../modules/authentication');

module.exports = async function (request, response) {

  const sessionId = request.session && request.session.sessionId;
  const session = sessionId ? await authentication.getSession(sessionId) : {} ;
  const { city } = request.query;

const [ restaurants, allRestaurants ] = await Promise.all( [list(city), list()] )

const cities = await getCities(
  allRestaurants.map(element => element.location )
  );

  return response.render('home.html', { selectedCity: city, restaurants: restaurants, cities, userId: session.userId }  );
};
 



