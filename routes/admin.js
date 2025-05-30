const { Router } = require("express");

const adminRouter = Router();

// adminRouter.udse(adminMiddleware);

// admin signup
adminRouter.post("/signup", (req, res) => {
  res.json({
    message: "admin signup endpoint",
  });
});

// admin login
adminRouter.post("/signin", (req, res) => {
  res.json({
    message: "admin signin endpoint",
  });
});

// admin course creation
adminRouter.post("/course", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

// admin updating the course
adminRouter.put("/course", (req, res) => {
  res.json({
    message: "update the course",
  });
});

// admin getting all the courses in bulk
adminRouter.put("/course/bulk", (req, res) => {
  res.json({
    message: "getting all launched courses",
  });
});

module.exports = adminRouter;
