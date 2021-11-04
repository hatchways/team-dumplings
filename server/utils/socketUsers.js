let users = {};

const getUser = (userId) => {
  return users[userId];
};

const addUser = (userId, socketId) => {
  users[userId] = socketId;
  return users;
};

const removeUser = (socketID) => {
  let key = Object.keys(users).find((k) => users[k] === socketID);
  delete users[key];
  return users;
};

module.exports = { addUser, removeUser, getUser };
