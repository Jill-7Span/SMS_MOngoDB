const express = require('express');
const router = express.Router();
const businessController = require("./businessController");
const middleware = require("../middleware/authMiddleware");
const validator = require("../validation/indexOfRequest");

router.get("/business", middleware.authOfBusiness, businessController.businessDetails);

router.get("/list", middleware.authOfBusiness, businessController.businessList);

router.post("/signUp", validator.signUpBusiness, businessController.businessSignUp);

router.get("/logIn", validator.loginBusiness, businessController.businessLogIn);

router.put("/update", [validator.updateBusiness, middleware.authOfBusiness], businessController.businessUpdate);

router.put("/changePassword", middleware.authOfBusiness, businessController.businessPasswordChange);

router.delete("/deleteBusiness", middleware.authOfBusiness, businessController.businessDelete);

module.exports = router;