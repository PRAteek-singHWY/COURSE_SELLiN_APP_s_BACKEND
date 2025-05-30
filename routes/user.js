const express = require("express");
const router = express.Router();

// User signup route
router.post("/signup", (req, res) => {
  // TODO: Handle user signup logic
  res.send("User signup");
});

// User login route
router.post("/login", (req, res) => {
  // TODO: Handle user login logic
  res.send("User login");
});

// Purchase a course route
router.post("/courses/:courseId/purchase", (req, res) => {
  // TODO: Handle course purchase logic
  res.send("Course purchased");
});

// Get all available courses
router.get("/courses", (req, res) => {
  // TODO: Return list of all courses
  res.send("All courses");
});

// Get all purchased courses by the user
router.get("/purchasedCourses", (req, res) => {
  // TODO: Return user's purchased courses
  res.send("Purchased courses");
});

module.exports = router;
