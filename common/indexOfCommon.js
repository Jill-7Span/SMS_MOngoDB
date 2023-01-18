const { createNewUser } = require("./addUserCommon");
const { tokenJwt } = require("./jwtCommon");
const { data } = require("./nullCheckCommon");
const { permission } = require("./permissionOfRoute");
const { serverError, invalidDetails, success, numberExist,
    emailExist, updated, incorrectPassword, passwordNOtMatch, alreadyExits,
    deleted, unauthorized } = require("./statusCodes");


module.exports = {
    tokenJwt, data, createNewUser, permission, serverError, invalidDetails, success, numberExist,
    emailExist, updated, incorrectPassword, passwordNOtMatch, alreadyExits, deleted, unauthorized
};