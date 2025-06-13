const { Router } = require("express");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { adminModel } = require("../db");
const { courseModel } = require("../db");

const adminRouter = Router();
const adminMiddleWare = require("../middleware/admin");
// adminRouter.udse(adminMiddleware);

// bcrypt library (hashing passwords)
// zod (validate user inputs)
// jsonwebtoken ( to create JWT for the user )

// admin signup

// ✏️ Zod schema to validate signup input
//

//

//

//

//

//

//

const adminSignUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

// SIGNUP ROUTE FOR ADMIN

adminRouter.post("/signup", async (req, res) => {
  const parsed = adminSignUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.errors });
  }

  const { firstName, lastName, email, password } = parsed.data;

  try {
    // checking if admin is already registered

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    //

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    const token = jwt.sign(
      { adminId: newAdmin._id },
      process.env.JWT_SECRET_KEY_ADMIN
    );

    res.status(201).json({
      message: "Admin registered Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error: error.message });
  }
});
//
//

//

//

//

//

//

//

// SIGNIN ROUTE FOR ADMIN

const adminSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// admin login
adminRouter.post("/signin", async (req, res) => {
  const parsed = adminSignInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid Input", errors: parsed.error.errors });
  }

  const { email, password } = parsed.data;

  try {
    const existingAdmin = await adminModel.findOne({ email });
    if (!existingAdmin) {
      res.status(400).json({ message: "User Not Registered" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }
    const token = jwt.sign(
      { adminId: existingAdmin._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      message: "Signin successfull",
      token,
    });
  } catch (error) {
    res.status(500).json();
  }

  // res.json({
  //   message: "admin signin endpoint",
  // });
});
//

//

//

//

//

//

//

// admin course creation
adminRouter.post("/course", adminMiddleWare, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price } = req.body;
  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course ccreated",
    courseId: course._id,
  });
});

// admin updating the course
adminRouter.put("/course", adminMiddleWare, async (req, res) => {
  // const adminId = req.adminId;
  const { title, description, imageUrl, price, courseId } = req.body;
  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course uupdated",
    courseId: course._id,
  });
});

// admin getting all the courses in bulk
adminRouter.get("/course/bulk", adminMiddleWare, async (req, res) => {
  const { userId } = req.body;
  const adminId = userId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "all courses fetched",
    courses,
  });
});

module.exports = adminRouter;
