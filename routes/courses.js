const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleWare } = require("../middleware/ user");
const { adminMiddleWare } = require("../middleware/admin");

console.log("purchaseModel:", typeof purchaseModel);
console.log("purchaseModel keys:", Object.keys(purchaseModel));
console.log("typeof purchaseModel.findOne:", typeof purchaseModel.findOne);

// Get all available courses (prview available courses)
courseRouter.get("/preview", async (req, res) => {
  // show all the courses in courseschema
  

  try {
    const courses = await courseModel.find({});
    return res.status(200).json({
      message: "Courses fetched successfully",
      courses: courses,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch courses", error: err.message });
  }
});

// handles when user is trying to buy a course
courseRouter.post("/purchase", userMiddleWare, async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;

  try {
    const existingPurchase = await purchaseModel.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (existingPurchase) {
      return res
        .status(404)
        .json({ message: "You're already enrolled in this course" });
    }
    //  check if the user has actually paid the price'
    // saving it to db in purhase model
    const purchase = await purchaseModel.create({
      courseId: courseId,
      userId: userId,
    });
    res.json({ message: "purchased successfully", purchaseId: purchase._id });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = courseRouter;
