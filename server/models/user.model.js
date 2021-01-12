const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.plugin(uniqueValidator, { message: "Email already exist" });

module.exports = User = mongoose.model("user", userSchema);
