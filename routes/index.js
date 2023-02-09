const express = require('express');
const router = express.Router();
const business = require("../business/business");
const contacts = require("../contacts/contacts");
const templates = require("../template/template");
const sms = require("../sms/sms");
const schedular = require("../cron/cron")
const tags = require("../tag/tag")

// Routes
router.use("/business", business);

router.use("/contacts", contacts);

router.use("/templates", templates);

router.use("/sms", sms);

router.use("/schedular", schedular);

router.use("/tags",tags)


module.exports = router;


