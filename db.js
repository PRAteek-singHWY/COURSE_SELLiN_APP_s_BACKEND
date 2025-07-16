const mongoose = require("mongoose");
// 🏁

// const { use } = require("react");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
// A schema is like a blueprint for the documents in a MongoDB collection.

const userSchema = new Schema({
  //    id (automatically added by MongoDB as _id of type ObjectId)
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const courseSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  price: { type: Number, required: true, unique: false },
  imageUrl: String,
  // createId: ObjectId,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref needs to have the model name which we gave for database (like we see user,admin,purchase,course) so taht name
    ref: "Users",
  },
});

// A model is created from a schema and is used to interact with the database.

const userModel = mongoose.model("Users", userSchema);
const adminModel = mongoose.model("Admins", adminSchema);
const courseModel = mongoose.model("Courses", courseSchema);
const purchaseModel = mongoose.model("Purchases", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
