const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const dogRouter = require("./routes/dog");
const paymentRouter = require("./routes/stripe");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const reviewRouter = require("./routes/review");

const ioCookieParser = require("socket.io-cookie-parser");
const jwt = require("jsonwebtoken");
const { authentication, messaging } = require("./middleware/messagingSocket");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
io.use(ioCookieParser());
io.use(authentication).on("connection", (socket, next) =>
  messaging(socket, next, io)
);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);

app.use("/requests", requestRouter);
app.use("/dogs", dogRouter);

app.use("/payments", paymentRouter);

app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/comments", reviewRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
