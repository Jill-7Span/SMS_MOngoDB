const express = require('express');
const router = express.Router();
const smsController = require("./smsController");
const middleware = require("../middleware/authMiddleware");


router.post("/sendSms", middleware.authOfBusiness, smsController.sendSms);


module.exports = router;