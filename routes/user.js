const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userModel } = require("../db");

// User signup route

const userRouter = Router();

//

//

//

//

//

//

//
const userSignUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

userRouter.post("/signup", async (req, res) => {
  const parsed = userSignUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.errors });
  }

  const { firstName, lastName, email, password } = parsed.data;

  try {
    // checking if user is already registered

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    //

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
console.log("Saving new user...");
await newUser.save();
console.log("User saved successfully.");

    // await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({
      message: "User registered Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error: error.message });
  }
  // res.send("User signup endpoint");
});
//

//

//

//

//

//

//
// User login route
const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

userRouter.post("/login", async (req, res) => {
  const parsed = userSignInSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.errors });
  }

  const { email, password } = parsed.data;

  // if user is registered

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "User Not Registered" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      message: "Signin successfull",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error: error.message });
  }

  // res.send("User login endpoint");
});

// middleware
// to view the courses purchased by user
userRouter.post("/purchases", (req, res) => {
  res.send("Course purchased endpoint");
});

module.exports = userRouter; // <-- THIS exports the router
