const mongoose = require("mongoose");

const usersModel = new mongoose.Schema({
  role:{
    type: String,
    required:true,
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
});

const UsersModel = mongoose.model("users", usersModel);


module.exports = UsersModel;

// minlength: 4,
// maxlength: 200