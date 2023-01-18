const express = require('express');
const router = express.Router();
const usersController = require("./userController");
const authMiddleware = require("../middleware/authMiddleware");
const validator = require("../requests/indexOfRequest");

router.get("/user", authMiddleware.authOfUsers, usersController.userDetails);

router.get("/list", authMiddleware.authOfUsers, usersController.userList);

router.post("/signUp", validator.userSignUpValidation, usersController.userSignUp);

router.get("/logIn", validator.checkLoginParameter, usersController.userLogIn);

router.put("/update", [validator.updateUserValidation, authMiddleware.authOfUsers], usersController.userUpdate);

router.put("/changePassword", authMiddleware.authOfUsers, usersController.userPasswordChange);

router.delete("/deleteUser", authMiddleware.authOfUsers, usersController.userDelete);




router.post("/adminSignup", validator.userSignUpValidation, usersController.admin);

router.get("/listOfPermission", authMiddleware.authOfUsers ,usersController.listOfRoute);

router.post("/addPermission", authMiddleware.authOfUsers , usersController.addRoute);

router.delete("/deletePermission", authMiddleware.authOfUsers, usersController.deleteRoute);


module.exports = router;