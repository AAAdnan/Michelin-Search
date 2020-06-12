const Restaurant  = require('../persistence/restaurants');

const list = async (city) => {

  const results = await Restaurant.list(city);

  return results;

}

const create = async (restaurant) => {
  
  const newRestaurant = await Restaurant.create(restaurant)

  return newRestaurant;

}

module.exports={
    list,
    create
}