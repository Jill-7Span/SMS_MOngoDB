const mongoose = require("mongoose");

const templates = new mongoose.Schema({

  template: {
    type: String,
    required: true,
    trim: true,
    maxLength: 225,
  },
  category: {
    type: String,
    default: "general category",
    trim: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
    required: false,
  },
}, { 
  timestamps: { createdAt: true, updatedAt: false } 
},{
    versionKey: false
});
const templatesModel = mongoose.model("templates", templates);

module.exports = templatesModel;

