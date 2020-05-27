const {Router} = require('express');
const pages = require('./pages');
const login = require('./pages/login');
const logout = require('./pages/logout');
const signup = require('./pages/signup');
const folder = require('./pages/folder');


const router = new Router();

router.get('/', pages.home);
router.get('/about', pages.about);
router.get('/dashboard', pages.dashboard);

router.get('/login', login.get);
router.get('/signup', signup.get)
router.get('/logout', logout.get)
router.post('/signup', signup.post)
router.post('/login', login.post);
router.get('/folder', folder.get)
router.post('/upload', folder.post)
router.use((request, response) => {
  return response.status(404).render('404.html');
});

module.exports = router;
