const usersService = require("../user/userService");
const jwt = require("../common/jwtCommon");
const status = require("../common/statusCodes")
const bcrypt = require('bcrypt');


//  Add User or Admin Function 
exports.createNewUser = async (req, res, values) => {
    const bodyData = req.body;
    const matchRole = values.find(element => element == bodyData.role);
    if (!matchRole) {
        return status.unauthorized(res);
    }
    const existingUser = await usersService.getUserData(
        {
            $or: [
                { email: bodyData.email },
                { contactNumber: bodyData.contactNumber }
            ]
        });
    if (!existingUser) {
        if (bodyData.password === bodyData.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            bodyData.password = await bcrypt.hash(bodyData.password, salt);
            const newUser = await usersService.creteUser(bodyData);
            delete newUser.password 
            const token = jwt.tokenJwt(newUser);
            const newUserDetail = {...newUser,token };
            return res.status(200).json(newUserDetail);
        } else {
            return status.passwordNOtMatch(res);
        }
    } else {
        return status.alreadyExits(res);
    }
};