const mongoose = require("mongoose");

const userClient = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  phone1: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
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