const { getCities } = require('../modules/cities');
const { list } = require('../modules/restaurants');
const authentication = require('../modules/authentication');
// const { map } = require('../modules/mapbox');

module.exports = async function (request, response) {

  const sessionId = request.session.sessionId;
  const session = sessionId ? await authentication.getSession(sessionId) : {};
  const { city } = request.query;

  const [ restaurants, allRestaurants ] = await Promise.all( [list(city), list()] )

  const cities = await getCities(
    allRestaurants.map(element => element.location )
  );

  const locations = restaurants.map(restaurant => {
    return {
      type: "Feature",
      geometry: {
      type: "Point",
      coordinates: 
      [
        restaurant.lat,
        restaurant.lng
      ]
      },
      properties: {
        restaurantId: restaurant.id,
        icon: 'shop'
      }

    };
  });

  return response.render('home.html', { selectedCity: city, restaurants: restaurants, cities, userId: session && session.userId, locations: locations }  );
};
 



