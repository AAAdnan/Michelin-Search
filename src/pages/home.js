const { getCities } = require('../modules/cities')

module.exports = async function (request, response) {
  const cities = await getCities();
  const { city } = request.query;
  return response.render('home.html', { cities, selectedCity: city }  );
};




