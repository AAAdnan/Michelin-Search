const Restaurant  = require('../persistence/restaurants');

const list = async (city) => {

  const results = await Restaurant.list(city);

  return results;

}

module.exports={
    list
}