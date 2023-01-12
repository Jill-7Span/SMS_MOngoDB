const mongoose = require("mongoose");

const userClient = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});

const userClientModel = mongoose.model("user_client", userClient);


module.exports = userClientModel;