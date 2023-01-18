const express = require('express');
const router = express.Router();
const contactsController = require("./contactsController");
const validator = require("../validation/contactUpload");
const middleware = require("../middleware/authMiddleware");


router.get("/findContact", middleware.authOfBusiness, contactsController.findContact);

router.post("/csvUpload", [middleware.authOfBusiness, validator.csvUpload], contactsController.csvUpload);


module.exports = router;