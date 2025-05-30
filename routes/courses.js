const { Router } = require("express");
const courseRouter = Router();

// Get all available courses (prview available courses)
courseRouter.get("/preview", (req, res) => {
  // TODO: Return list of all courses
  res.send("All courses endpoint");
});

// handles when user is trying to buy a course
courseRouter.get("/purchase", (req, res) => {
  // TODO: Return user's purchased courses
  res.send("Purchased courses endpoint");
});

module.exports = courseRouter;
