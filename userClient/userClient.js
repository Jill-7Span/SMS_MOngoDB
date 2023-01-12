const express = require('express');
const router = express.Router();
const usersController = require("./userClientController");
const validator = require("../requests/indexOfRequest");


router.post("/csvUpload", validator.csvUpload, usersController.csvUpload);

router.post("/vCard", validator.csvUpload, usersController.vCardContact)

router.get("/findContact", usersController.findContact)


module.exports = router;