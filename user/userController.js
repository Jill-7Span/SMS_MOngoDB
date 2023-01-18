const usersService = require("./userService");
const userCache = require("../requests/usersCacheRequest");
const bcrypt = require('bcrypt');
const status = require("../common/indexOfCommon");



// get user
exports.userDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        const userCacheData = await userCache.getCacheData(userId);
        if (userCacheData != null) {
            return res.json(JSON.parse(userCacheData));
        } else {
            const existingUser = await usersService.getUserData({ _id: userId });
            await userCache.setCacheData(userId, existingUser);
            return status.success(res, existingUser);
        }
    } catch (error) {
        return status.serverError(res,error);
    };
};

// get users
exports.userList = async (req, res) => {
    try {
        const { emailSearch, numberSearch, size, page } = req.query;
        let condition = {};
        if (emailSearch || numberSearch) {
            condition = {
                $or: [
                    { email: { $regex: emailSearch } },
                    { contactNumber: { $regex: numberSearch } },
                ]
            }

        } else if (size && page) {
            condition = {
                limit: parseInt(size),
                offset: parseInt(size) * parseInt((page - 1)),
            };
        } else if (condition = {}) {

            condition = {};
        }
        const users = await usersService.getUsersList(condition);
        return status.success(res, users);
    } catch (error) {
        return status.serverError(res,error);

    };
};

//  Sign Up
exports.userSignUp = async (req, res) => {
    try {
        const values = ['USER'];  // by default set to USER from front end
        req.body.role = "USER";
        await status.createNewUser(req, res, values);
    } catch (error) {
        return status.serverError(res,error);

    };
};


// log in
exports.userLogIn = async (req, res) => {
    try {
        const { password, email } = req.body;

        const users = await usersService.getUserData({ email });
        if (!users) return status.invalidDetails;
        const userData = {
            firstName: users.firstName,
            lastName: users.lastName,
        }
        if (users) {
            const userPassword = users.password;
            const passwordCompare = await bcrypt.compare(password, userPassword);
            if (passwordCompare) {
                const token = status.tokenJwt(users);
                return status.success(res, { ...userData, token });
            } else {
                return status.invalidDetails;
            }
        } else {
            return status.invalidDetails;
        }
    } catch (error) {
        return status.serverError(res,error);

    };
};

// update users
exports.userUpdate = async (req, res) => {
    try {
        const body = req.body;
        const tokenId = req.user;
        console.log('tokenId: ', tokenId);
        const existingUserData = await usersService.getUserData({ _id: tokenId });

        let update = {};
        const existingContactNumberOrEmail = await usersService.getUsersList({
            $or: [
                { contactNumber: body.contactNumber },
                { email: req.body.email }
            ]
        });
        if ((req.body.hasOwnProperty("contactNumber")) || (req.body.hasOwnProperty("email"))) {
            if ((existingContactNumberOrEmail.length == 0) || (existingContactNumberOrEmail[0]._id === tokenId)) {
                update.contactNumber = parseInt(body.contactNumber);
                update.email = body.email;
            } else {
                for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
                    const element = existingContactNumberOrEmail[i];
                    if ((element._id != tokenId) && (element.contactNumber === parseInt(body.contactNumber))) {
                        return status.numberExist;
                    }
                    if ((element._id != tokenId) && (element.email === body.email)) {
                        return status.emailExist;
                    }
                };
            }
        };
        update.updated_at = new Date();
        const updatedData = await usersService.updateUser(existingUserData._id, update);
        const token = status.tokenJwt(updatedData);
        return status.success(res, { ...updatedData, token });
    } catch (error) {
        return status.serverError(res,error);

    };
};

// change password
exports.userPasswordChange = async (req, res) => {
    try {
        const email = req.user.email;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const update = {};
        if (newPassword === confirmPassword) {
            const user = await usersService.getUserData({ where: { email } });
            bcrypt.compare(oldPassword, user.password, async (err, data) => {
                if (err) throw err;

                if (data) {
                    const salt = await bcrypt.genSalt(10);
                    update.password = await bcrypt.hash(newPassword, salt);
                    update.updated_at = new Date();
                    await usersService.updateUser(user._id, update);
                    return status.updated;
                } else {
                    return status.incorrectPassword;
                }
            });
        } else {
            return status.passwordNOtMatch;
        };
    } catch (error) {
        return status.serverError(res,error);
    };
};

// delete users
exports.userDelete = async (req, res) => {
    try {
        const _id = req.user._id;
        await usersService.deleteUser(_id);
        // await userCache.deleteCacheData(req.query._id, existingUser);
        return status.deleted(res);
    } catch (error) {
        return status.serverError(res,error);

    };
};


// add admin
exports.admin = async (req, res) => {
    try {
        const values = ['ADMIN'];
        await status.createNewUser(req, res, values);
    } catch (error) {
        return status.serverError(res,error);
    };
};



//get route permission 
exports.listOfRoute = async (req, res) => {
    try {
        const { operationsName, role } = req.query
        const permissionList = await usersService.listOfRoute(operationsName, role);
        return status.success(res, permissionList);
    } catch (error) {
        return status.serverError(res,error);
    };
};

//add route permission
exports.addRoute = async (req, res) => {
    try {
        let { operationsName, role, routes } = req.body;
        const existingPermission = await usersService.findOnePermission({
            where:
            {
                operationsName: operationsName,
                role: role,
            }
        });
        if (!existingPermission) {
            role = role.toUpperCase();
            routes = status.permission[operationsName];
            const permissionAdded = await usersService.addPermission({ operationsName, role, routes });
            return status.success(res, permissionAdded);
        } else {
            return status.alreadyExits;
        };
    } catch (error) {
        return status.serverError(res,error);
    };
};

//delete route permission
exports.deleteRoute = async () => {
    try {
        const { operationsName, role } = req.query;
        await usersService.deletePermission(operationsName, role);
        return status.success(res, { "Deleted id was": req.query.id });
    } catch (error) {
        return status.serverError(res,error);
    };
};