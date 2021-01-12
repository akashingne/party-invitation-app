const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  dietary: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
});

guestSchema.plugin(uniqueValidator, { message: "Mobile already exist" });

module.exports = Guest = mongoose.model("guest", guestSchema);
