const express = require('express');
const router = express.Router();
const contactsController = require("./contactsController");
const validator = require("../validation/contactUpload");
const middleware = require("../middleware/authMiddleware");


router.get("/findContact", middleware.authOfBusiness, contactsController.findContact);

router.get("/allContacts",middleware.authOfBusiness , contactsController.allContacts);

router.post("/csvUpload", [middleware.authOfBusiness, validator.csvUpload], contactsController.csvUpload);

router.put("/updateContact", middleware.authOfBusiness, contactsController.updateContact);

router.put("/updateTags", middleware.authOfBusiness, contactsController.updateTags);

router.delete("/deleteContact", middleware.authOfBusiness, contactsController.deleteContact);




module.exports = router;