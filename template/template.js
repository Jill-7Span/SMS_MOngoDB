const express = require('express');
const router = express.Router();
const templateController = require("./templateController");


router.post("/addTemplate",  templateController.addTemplate);

router.post("/readTemplate",  templateController.readTemplate);

router.get("/updateTemplate", templateController.updateTemplate);

router.get("/deleteTemplate", templateController.deleteTemplate);


module.exports = router;