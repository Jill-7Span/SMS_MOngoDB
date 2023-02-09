const express = require('express');
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const tagController = require("../tag/tagController");

router.get("/findTag", middleware.authOfBusiness, tagController.findTags);

router.get("/allTag", middleware.authOfBusiness, tagController.allTags);

router.post("/createTag", middleware.authOfBusiness, tagController.createTag);

router.delete("/deleteTag", middleware.authOfBusiness, tagController.deleteTag);


module.exports = router;