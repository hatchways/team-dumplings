const jwt = require("jsonwebtoken");
const { addUser, removeUser, getUser } = require("../utils/socketUsers");

exports.authentication = (socket, next) => {
  const token = socket.request.cookies["token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      return next(new Error("Authentication Error"));
    }
  } else {
    return next(new Error("Authentication Error"));
  }
};

exports.messaging = (socket, next, io) => {
  socket.on("addUser", (userId) => {
    const users = addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ recipientId, ...rest }) => {
    const activeUser = getUser(recipientId);
    if (activeUser) {
      io.to(activeUser).emit("getMessage", { ...rest });
    }
  });

  socket.on("disconnect", () => {
    const users = removeUser(socket.id);
    io.emit("getUsers", users);
  });
};
