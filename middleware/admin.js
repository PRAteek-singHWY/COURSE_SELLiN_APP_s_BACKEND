const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleWare = (req, res, next) => {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN);
    if (decoded) {
      req.adminId = decoded.id;
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
  adminMiddleWare,
};
