const {Router} = require('express');
const multer = require('multer');
const { upload: multerRestaurant } = require('./modules/uploadRestaurants');
const { upload: multerReview } = require('./modules/uploadReview')
const pages = require('./pages');
const login = require('./pages/login');
const logout = require('./pages/logout');
const signup = require('./pages/signup');
const upload = require('./pages/upload')
const uploadRestaurant = require('./pages/uploadRestaurant');
const uploadReview = require('./pages/uploadReview');
const reviews = require('./pages/reviews');

const router = new Router();

router.get('/', pages.home);
router.get('/about', pages.about);
router.get('/dashboard', pages.dashboard);
router.get('/login', login.get);
router.get('/signup', signup.get)
router.get('/logout', logout.get)
router.get('/uploadRestaurant', uploadRestaurant.get)
router.post('/uploadRestaurant', multerRestaurant, uploadRestaurant.post)
router.get('/uploadReview', uploadReview.get)
router.post('/uploadReview', multerReview, uploadReview.post)
router.post('/signup', signup.post)
router.post('/login', login.post);
router.get('/reviews', reviews.get)
router.post('/upload', upload.post)
router.use((request, response) => {
  return response.status(404).render('404.html');
});

module.exports = router;
