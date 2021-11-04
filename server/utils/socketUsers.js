let users = [];

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  return users;
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketId !== socketID);
  return users;
};

module.exports = { addUser, removeUser, getUser };
