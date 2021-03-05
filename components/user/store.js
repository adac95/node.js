
const Model = require('./model');

function addUser(user) {
  const newUser = new Model(user);
  return newUser.save();
}

function listUsers() {
  const user = Model.find();
  return user
}

module.exports = {
  add: addUser,
  list: listUsers
}