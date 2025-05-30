const { Router } = require("express");
const courseRouter = Router();

// Get all available courses (prview available courses)
courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

// handles when user is trying to buy a course
courseRouter.post("/purchase", (req, res) => {
  // you would expect the user to pay you money
  res.json({
    message: "Purchased courses endpoint",
  });
});

module.exports = courseRouter;
