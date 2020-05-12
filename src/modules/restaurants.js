const Restaurant  = require('../persistence/restaurants');

const list = async () => {

  const results = await Restaurant.list();

  return results;

}

module.exports={
    list
}