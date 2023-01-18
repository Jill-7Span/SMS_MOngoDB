const express = require('express');
const router = express.Router();
const templateController = require("./templateController");
const authMiddleware = require("../middleware/authMiddleware");



router.get("/readTemplate",authMiddleware.authOfUsers, templateController.readTemplate);

router.post("/addTemplate",authMiddleware.authOfUsers, templateController.addTemplate);
    
router.put("/updateTemplate",authMiddleware.authOfUsers, templateController.updateTemplate);

router.delete("/deleteTemplate",authMiddleware.authOfUsers, templateController.deleteTemplate);


module.exports = router;