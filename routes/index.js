const express = require('express');
const router = express.Router();
const business = require("../business/business");
const contacts = require("../contacts/contacts")
const templates = require("../template/template")

// Routes
router.use("/business", business);

router.use("/contacts", contacts);

router.use("/templates" , templates)


module.exports = router;


