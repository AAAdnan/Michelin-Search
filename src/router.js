const {Router} = require('express');
const pages = require('./pages');
const login = require('./pages/login');
const signup = require('./pages/signup')

const router = new Router();

router.get('/', pages.home);
router.get('/about', pages.about);
router.get('/dashboard', pages.dashboard);

router.get('/login', login.get);
router.get('/signup', signup.get)
router.post('/signup', signup.post)
router.post('/login', login.post);
router.use((request, response) => {
  return response.status(404).render('404.html');
});

module.exports = router;
