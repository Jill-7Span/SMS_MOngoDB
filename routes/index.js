const express = require('express');
const router = express.Router();
const users = require("../user/user");
const userClient = require("../userClient/userClient")
const templates = require("../template/template")

// Routes
router.use("/users", users);

router.use("/userClient", userClient);

router.use("/templates" , templates)


module.exports = router;


