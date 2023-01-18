const mongoose = require("mongoose");

const contactsModel = new mongoose.Schema({
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
  email: {
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
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { 
  timestamps: { createdAt: true, updatedAt: false } 
},{
    versionKey: false
});

const ContactsModel = mongoose.model("contactsModel", contactsModel);


module.exports = ContactsModel;