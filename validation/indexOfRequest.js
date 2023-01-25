const { updateBusiness } = require("./updateBusiness");
const { signUpBusiness } = require("./sighUpBusiness");
const { loginBusiness } = require("./logInBusiness");
const { csvUpload } = require("./contactUpload");


module.exports = { signUpBusiness, updateBusiness, loginBusiness, csvUpload };