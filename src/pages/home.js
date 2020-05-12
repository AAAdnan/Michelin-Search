const { getCities } = require('../modules/cities')
const { list } = require('../modules/restaurants')


module.exports = async function (request, response) {

  const restaurants = await list();
  const cities = await getCities(
    restaurants.map(element => element.location )
  );
 
  const { city } = request.query;

  const printRequest = function(chosenCity, restaurants) {

  const chosenCapitalized = chosenCity.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

  const arrayRestaurant = [];
  
  restaurants.forEach(element => {
   if (chosenCapitalized === element.location) {
     arrayRestaurant.push(element.name);
   }
  })

  return arrayRestaurant;

  }



  return response.render('home.html', { selectedCity: city, restaurants, cities, printRequest }  );
};
 



