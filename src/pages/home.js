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


  const restaurantsLength = restaurants.length;

  let locationLat;
  let locationLng;
  let zoom;

  if(!city) {
    locationLat = 51.5;
    locationLng = 0.1278;
    zoom = 1.5;
  } else {
    zoom = 11;
    locationLat = restaurants.map(restaurant => restaurant.lat).reduce((a,b) => a + b, 0) / restaurantsLength;
    locationLng = restaurants.map(restaurant => restaurant.lng).reduce((a,b) => a + b, 0) / restaurantsLength;

  }
  

  const locations = restaurants.map(restaurant => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [ restaurant.lng,restaurant.lat]
      },
      properties: { 
        restaurantId: restaurant.id,
        name: restaurant.name,
        type: restaurant.type
      }
    };
  });



  const renderMapboxLocations = {
    type: "FeatureCollection",
    features: locations
  }

  return response.render('home.html', { selectedCity: city, restaurants: restaurants, cities, userId: session && session.userId, renderMapboxLocations: renderMapboxLocations, locationLat: locationLat, locationLng: locationLng, zoom: zoom }  );
};
 



