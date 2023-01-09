const express = require("express");

exports.serverError = (req,res) => {
    res.status(403).json({ message: error + ' Server error occurred' });
}