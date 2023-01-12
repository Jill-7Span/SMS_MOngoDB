const express = require('express');
const router = express.Router();
const templateController = require("./templateController");


router.get("/readTemplate",  templateController.readTemplate);

router.post("/addTemplate",  templateController.addTemplate);

router.get("/updateTemplate", templateController.updateTemplate);

router.get("/deleteTemplate", templateController.deleteTemplate);


module.exports = router;