
const store = require('./store');

// Peticion POST
function addUser(name) {
  if (!name) {
    return Promise.reject('Invalid name');
  }
  const user = {
    name,
  };
  return store.add(user);
}

// Peticion GET 
function listUsers() {
  return store.list();
}

module.exports = {
  addUser,
  listUsers,
}