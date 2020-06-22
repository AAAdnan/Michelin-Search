const { create } = require('../modules/restaurants')
const { createReview } = require('../modules/uploadReview')
const { sessionId } = require('../pages/login')
const authentication = require('../modules/authentication');
const userId = require('../pages/dashboard');
const { getCities } = require('../modules/cities');
const { getNames } = require('../modules/names');
const { list } = require('../modules/restaurants');
require('../modules/uploadRestaurants');
const cloudinary = require("cloudinary").v2;
const fs = require('fs');


module.exports = {
  async get (request, response) {

  let findIt = request.session.sessionId;

  const sessionId = request.session.sessionId;
  const session = sessionId ? await authentication.getSession(sessionId) : {};

  let userId = session.userId;

  const { city } = request.query;

  const [ restaurants, allRestaurants ] = await Promise.all( [list(city), list()] )

const cities = await getCities(
  allRestaurants.map(element => element.location )
  );

  const names = await getNames(
    allRestaurants.map(element => element.name)
  )

  return response.render('uploadReview.html', { userId, cities , names, restaurants: allRestaurants } );
},
    async post(request, response){

      const urls = [];

      const files = request.files

      for (const file of files ) {
        const { path } = file

        const newPath = await cloudinary.uploader.upload(path)

        urls.push(newPath.url)

        fs.unlinkSync(path)

      }

      console.log(urls)

      const review = request.body;
      

      let newReview = await createReview(review, urls);

    }
}
