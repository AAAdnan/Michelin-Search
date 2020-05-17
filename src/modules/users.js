const bcrypt = require('bcrypt');
const User = require('../persistence/users');

async function create(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create(email, hashedPassword);
}

async function find(email) {
  const user = User.find(email);
  return user;
}

module.exports = {
  create, find
};
