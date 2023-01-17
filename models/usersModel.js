const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersModel = new mongoose.Schema({
  // _id: {
  //   type: Schema.Types.ObjectId
  // },
  role: {
    type: String,
    trim: true,
    default:"USER",
    enum: ["USER", "ADMIN"],

  },
  firstName: {
    type: String,
    min: [3, 'first name must be greater than 3 letters'],
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    min: [3, 'first name must be greater than 3 letters'],
    required: true,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    select: false,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});

const UsersModel = mongoose.model("users", usersModel);

module.exports = UsersModel;