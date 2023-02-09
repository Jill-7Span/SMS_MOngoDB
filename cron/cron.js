const express = require('express');
const router = express.Router();
const cronController = require("./cronController");


router.post("/cronSchedular",  cronController.cronSchedular);

// router.post("/test",  cronController.test);

module.exports = router;
