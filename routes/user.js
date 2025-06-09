const { Router } = require("express");
const userRouter = Router();
const userModel = require("../db");
// User signup route
userRouter.post("/signup", (req, res) => {
  res.send("User signup endpoint");
});

// User login route
userRouter.post("/login", (req, res) => {
  res.send("User login endpoint");
});

// to view the courses purchased by user
userRouter.post("/purchases", (req, res) => {
  res.send("Course purchased endpoint");
});

module.exports = userRouter; // <-- THIS exports the router
