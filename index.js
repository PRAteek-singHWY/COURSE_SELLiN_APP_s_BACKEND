const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/user");
const courseRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("mongoose connected");
    app.listen(3000, () => {
      console.log("Server is runnig on 3000");
    });
  } catch (err) {
    console.error("connection to mongoDB failed", err);
    process.exit(1);
  }
};

main();
// await app.listen(3000);
