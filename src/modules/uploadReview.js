const User = require('../persistence/users');
const multer = require('multer');
const path = require('path');
const { find }  = require('../persistence/restaurants');
const Session = require('../persistence/sessions.js');
const Review = require('../persistence/reviews');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/meals')
  },
  filename: function (req, file, cb) {
      switch (file.mimetype) {
          case 'image/jpeg':
              ext = '.jpeg';
              break;
          case 'image/png':
              ext = '.png'
              break; 
      }
      cb(null, file.originalname + ext);
  }
});

function checkFileType(file,cb){
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname
      (file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
      return cb(null,true);
  } else {
      cb('Error: Images Only!')
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function(req,file,cb) {
      checkFileType(file, cb)
  }
}).array('images', 6);

async function createReview(review, urls) {

  const { description, courses, meals, rating } = review;

  const restaurant = review.name;

  const newRestaurantArray = await find(restaurant);

  let newRestaurant = newRestaurantArray[0].id;

  const newReview = await Review.create(newRestaurant, review, courses, meals, urls)

  return newReview;
};

module.exports = {
  createReview,
  upload
}

