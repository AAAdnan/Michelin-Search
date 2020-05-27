const User  = require('../modules/users');
const auth = require('../modules/authentication');

function validUser(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != '';

  const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

  return validEmail && validPassword;
}

function validPassword(user) {
  const validPassword = user.password === user.passwordTwo;

  return validPassword
}

const redirectHome = (request, response, next) => {
  if (req.session.userId) {
      res.redirect('/home')
  } else {
      next()
  }
}

module.exports = {
  async get(request, response) {
    return response.render('signup.html');
  },

  async post(request, response) {
  try {
    const { email, password, passwordTwo } = request.body;

    if (!email || !password  ) {
      return response.render('signup.html', {
        emailError: true,
        form: {email, password}
      })
    }
  
    const user = request.body;

    if(!validPassword(user)) {
      return response.render('signup.html', {
        passwordConfirmError: true,
      })
    }

    if(!validUser(user)){
      return response.render('signup.html', {
          passwordError: true,
        }
      )
    } 
     const findUser = await User.find(user.email);

     if (findUser) {
      return response.render('signup.html', {
        duplicateUserError: true,
      })
    } 
      const newUser = await User.create(user.email, user.password)
      const sessionId = await auth.createSession(email, password);
      request.session.sessionId = sessionId;


      console.log(`created ${newUser}`)

      return response.redirect('/');


  }
    catch (error) {
      console.error(`POST /signup >> Error: ${error.stack}`);
      return response
        .status(500)
        .render('500.html', {message: error.toString()});
    }
  }

};

