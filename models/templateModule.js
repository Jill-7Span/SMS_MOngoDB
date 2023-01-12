const mongoose = require("mongoose");

const templates = new mongoose.Schema({

  status: {
    type: String,
    required: true,
    trim: true,
    enum: ["approved", "not approved"],

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
const templatesModel = mongoose.model("templates", templates);


module.exports = templatesModel;

