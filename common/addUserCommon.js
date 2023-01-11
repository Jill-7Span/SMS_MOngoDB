const usersService = require("../users/userService");
const common = require("../common/jwtCommon");
const bcrypt = require('bcrypt');

//  Add User or Admin Function 
exports.createNewUser = async (req, res, values) => {
    const bodyData = req.body;
    console.log('bodyData: ', bodyData);
    const matchRole = values.find(element => element == bodyData.role);
    console.log('matchRole: ', matchRole);
    if (!matchRole) {
        return res.status(400).json({ Message: "You are not authorize to this page" });
    }
    const existingUser = await usersService.getUserData(
        {
            $or: [
                { email: bodyData.email },
                { contactNumber: bodyData.contactNumber }
            ]
        }
    );
    if (!existingUser) {
        if (bodyData.password === bodyData.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            bodyData.password = await bcrypt.hash(bodyData.password, salt);
            const newUser = await usersService.creteUser(bodyData);
            const token = common.tokenJwt(newUser);
            const newUserDetail = { ...newUser, token };
            return res.status(200).json(newUserDetail);
        } else {
            return res.status(401).json({ Message: "Invalid Confirm Password" });
        }
    } else {
        return res.status(401).json({ Message: "users Already exits" });
    }
};