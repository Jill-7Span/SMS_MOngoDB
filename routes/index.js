const express = require('express');
const router = express.Router();
const users = require("../user/user");
const userClient = require("../userClient/userClient")
// Routes
router.use("/users", users);

router.use("/userClient", userClient);


module.exports = router;


