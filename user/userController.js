const usersService = require("./userService");
const userCache = require("../requests/usersCacheRequest");
const bcrypt = require('bcrypt');
const status = require("../common/indexOfCommon");



// get user
exports.userDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        
        // const userCacheData = await userCache.getCacheData(userId);
        // if (userCacheData != null) {
        //     return res.json(JSON.parse(userCacheData));
        // } else {
            const existingUser = await usersService.getUserData({_id: userId});
            // await userCache.setCacheData(userId, existingUser);
            return status.success(res, existingUser);
        // }
    } catch (error) {
        return status.serverError;

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
                    { email: { $regex: emailSearch, $options: 'i' } },
                    { contactNumber: { $regex: numberSearch, $options: 'i' } },
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
        return res.status(200).json(users);
    } catch (error) {
        return status.serverError;

    };
};

//  Sign Up
exports.userSignUp = async (req, res) => {
    try {
        const values = ['USER'];  // by default set to USER from front end

        await status.createNewUser(req, res, values);
    } catch (error) {
        return status.serverError;

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
                return res.status(200).json({ ...userData, token });
            } else {
                return status.invalidDetails;
            }
        } else {
            return status.invalidDetails;
        }
    } catch (error) {
        return status.serverError;

    };
};

// update users
exports.userUpdate = async (req, res) => {
    try {
        const body = req.body;
        const tokenId = req.user.id;
        const existingUserData = await usersService.getUserData({ where: { id: tokenId } });

        let update = {};
        if (body.firstName.length != 0) {
            update.firstName = body.firstName;
        }
        if (body.lastName.length != 0) {
            update.lastName = body.lastName;
        }
        if (existingUserData.email === body.email) {
            update.email = body.email;
        }
        if (existingUserData.contactNumber === parseInt(body.contactNumber)) {
            update.contactNumber = parseInt(body.contactNumber);
        }
        const existingContactNumberOrEmail = await usersService.getUsersList({
            where: {
                [Op.or]: [
                    { contactNumber: body.contactNumber },
                    { email: req.body.email }
                ]
            }
        });
        if ((req.body.hasOwnProperty("contactNumber")) || (req.body.hasOwnProperty("email"))) {
            if ((existingContactNumberOrEmail.length == 0) || (existingContactNumberOrEmail[0].id === tokenId)) {
                update.contactNumber = parseInt(body.contactNumber);
                update.email = body.email;
            } else {
                for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
                    const element = existingContactNumberOrEmail[i];
                    if ((element.id != tokenId) && (element.contactNumber === parseInt(body.contactNumber))) {
                        return res.status(400).json({ message: "Contact Number Already Exits" });
                    }
                    if ((element.id != tokenId) && (element.email === body.email)) {
                        return res.status(400).json({ message: "Contact Email Already Exits" });
                    }
                };
            }
        };
        update.updated_at = new Date();
        const updatedData = await usersService.updateUser(existingUserData.id, update);
        const token = status.tokenJwt(updatedData);
        return res.status(200).json({ ...updatedData, token });
    } catch (error) {
        return status.serverError;

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
                    await usersService.updateUser(user.id, update);
                    return res.status(200).json({ Message: "Your password is updated successfully" });
                } else {
                    return res.status(400).json({ Message: "Your password is incorrect" });
                }
            });
        } else {
            return res.status(400).json({ Message: "Password didn't match" });
        };
    } catch (error) {
        return status.serverError;
    };
};

// delete users
exports.userDelete = async (req, res) => {
    try {
        const email = req.query.email;
        await usersService.deleteUser(email);
        await userCache.deleteCacheData(req.query.id, existingUser);
        res.status(200).json({ "Deleted account was": email });
    } catch (error) {
        return status.serverError;

    };
};


//  Find Contact
exports.findContact = async (req, res) => {
    try {
        const id = req.body.id
        const uploadedCsv = await usersService.findContact(id);
        console.log('uploadedCsv: ', uploadedCsv);
        return res.status(200).json(uploadedCsv);
    } catch (error) {
        return status.serverError;
    }
}

// add admin
exports.admin = async (req, res) => {
    try {
        const values = ['ADMIN'];
        await status.createNewUser(req, res, values);
    } catch (error) {
        return status.serverError;
    };
};



//get route permission 
exports.listOfRoute = async (req, res) => {
    try {
        const { operationsName, role } = req.query
        const permissionList = await usersService.listOfRoute(operationsName, role);
        res.status(200).json(permissionList);
    } catch (error) {
        return status.serverError;
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
            return res.status(200).json(permissionAdded);
        } else {
            return res.status(403).json({ message: 'Already Exist' });
        };
    } catch (error) {
        return status.serverError;
    };
};

//delete route permission
exports.deleteRoute = async () => {
    try {
        const { operationsName, role } = req.query;
        await usersService.deletePermission(operationsName, role);
        return res.status(200).json({ "Deleted id was": req.query.id });
    } catch (error) {
        return status.serverError;
    };
};