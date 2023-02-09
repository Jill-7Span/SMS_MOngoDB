const express = require('express');
const router = express.Router();
const cronController = require("./cronController");
const middleware = require("../middleware/authMiddleware");


router.post("/cronSchedular", middleware.authOfBusiness, cronController.cronSchedular);

// router.post("/test",  cronController.test);

module.exports = router;
