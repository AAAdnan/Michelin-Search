const User  = require('../modules/users');

function validUser(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != '';

  const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

  return validEmail & validPassword;
}

module.exports = {
  async get(request, response) {
    return response.render('signup.html');
  },

  async post(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password  ) {
      return response.render('signup.html', {
        emailError: true,
        form: {email, password}
      })
    }
  
    const user = request.body;

    const findUser = await User.find(user.email);

    if (findUser) {
      return response.render('signup.html'), {
        duplicateUserError: true,
        form: {email, password}
      }
    } else {
      const newUser = await User.create(user.email, user.password)

      console.log(`created ${newUser}`)

      return response.redirect('/dashboard');
    }

  }
    catch (error) {
      console.error(`POST /signup >> Error: ${error.stack}`);
      return response
        .status(500)
        .render('500.html', {message: error.toString()});
    }
  }

};

