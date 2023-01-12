const mongoose = require("mongoose");

const template = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    trim: true,
    default:"not approved",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  template: {
    type: String,
    required: true,
    trim: true, 
    maxLength: 225  ,
  },
  category: {
    type: String,
    default:"general category",
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

const templateModel = mongoose.model("template", template);


module.exports = templateModel;