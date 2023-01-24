const express = require('express');
const router = express.Router();
const cronController = require("./cronController");


router.post("/cronSchedular",  cronController.cronSchedular);

module.exports = router;
