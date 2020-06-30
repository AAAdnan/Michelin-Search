const Restaurant  = require('../persistence/restaurants');

const list = async (city) => {

  const results = await Restaurant.list(city);

  return results;

}

const create = async (restaurant, url, latitude, longitude) => {
  
  const newRestaurant = await Restaurant.create(restaurant, url, latitude, longitude)

  return newRestaurant;

}

const find = async(name) => {
  
  const results = await Restaurant.find(name);

  return results
}

module.exports={
    list,
    create,
    find
}