const express = require('express');
const router = express.Router();
const usersController = require("./userClientController");
const validator = require("../requests/indexOfRequest");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/csvUpload", authMiddleware.authOfUsers, validator.csvUpload, usersController.csvUpload);

router.post("/vCard",authMiddleware.authOfUsers, validator.csvUpload, usersController.vCardContact)

router.get("/findContact",authMiddleware.authOfUsers, usersController.findContact)


module.exports = router;