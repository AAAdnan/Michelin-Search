const Restaurant  = require('../persistence/restaurants');

const list = async (city) => {

  const results = await Restaurant.list(city);

  return results;

}

const create = async (restaurant, url) => {
  
  const newRestaurant = await Restaurant.create(restaurant, url)

  return newRestaurant;

}

module.exports={
    list,
    create
}