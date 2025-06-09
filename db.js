const mongoose = require("mongoose");
// 🏁

// const { use } = require("react");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
// A schema is like a blueprint for the documents in a MongoDB collection.

const userSchema = new Schema({
  //    id (automatically added by MongoDB as _id of type ObjectId)

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
});

const adminSchema = new Schema({
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
    ref: "courseModel",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

// A model is created from a schema and is used to interact with the database.

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.export = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
