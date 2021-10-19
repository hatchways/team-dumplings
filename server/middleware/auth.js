const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).send("Not authorized");
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = protect;
