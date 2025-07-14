const jwt = require("jsonwebtoken");
require("dotenv").config();

const userMiddleWare = (req, res, next) => {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_USER);
    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    res.status(403).json({
      message: "You are not signed in",
    });
  }

  //   else{
  //     res.status(403).json({
  //         message:"You are not signed in "
  //     })
  //   }
};

module.exports = {
  userMiddleWare,
};
