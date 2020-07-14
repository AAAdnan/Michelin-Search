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

      const review = request.body;

      const { date } = review;
      
      const conversion = Date.now(date);

      try {

        for (const file of files ) {
          const { path } = file
  
          const newPath = await cloudinary.uploader.upload(path)
  
          urls.push(newPath.url)
  
          fs.unlinkSync(path)
  
        }

        const sessionId = request.session.sessionId;
        const session = sessionId ? await authentication.getSession(sessionId) : {};
      
        let userId = session.userId;
        
        let newReview = await createReview(review, date, urls, userId);
  
        if(newReview) {
          return response.render('uploadReview.html', { successMessage: true, userId: session.userId });
        }

      }
      catch (error) {
        console.error(`POST /login >> Error: ${error.stack}`);
        return response
          .status(500)
          .render('500.html', {message: error.toString()});
      }
    }
}
