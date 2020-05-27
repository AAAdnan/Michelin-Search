const User  = require('../modules/users');
const Session = require('../modules/authentication');

module.exports = {
  async get(request, response) {
    try {
      
      const deleteSession = request.session.sessionId;
  
      await Session.deleteSession(deleteSession);

      request.session = {};

      return response.redirect('/login')

    }
    catch (error) {
      console.error(`POST /signup >> Error: ${error.stack}`);
      return response
        .status(500)
        .render('500.html', {message: error.toString()});
    }
  },
};