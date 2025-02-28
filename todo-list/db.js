const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema, ObjectId } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true } // Enable automatic createdAt and updatedAt fields
);

// Apply the uniqueValidator plugin
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

// Todo Schema
const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: ObjectId, ref: "user", required: true }, // Reference to the user
    deadline: { type: Date },
  },
  { timestamps: true } // Enable automatic createdAt and updatedAt fields
);

// Add an index to improve query performance on userId
todoSchema.index({ userId: 1 });

// Export the models
const UserModel = mongoose.model("user", userSchema);
const TodoModel = mongoose.model("todo", todoSchema);

module.exports = {
  UserModel,
  TodoModel,
};
