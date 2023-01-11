const model = require("../models/db");
const common = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const UsersModel = require("../models/usersModel");
const userClientModel = require("../models/user_client")



//get user
exports.getUserData = async (condition) => {
    console.log('condition: ', condition);
    try {
        const data = await UsersModel.findOne(condition);
        return common.data(data);
    } catch (error) {
        return error;
    }; l
};

// get users
exports.getUsersList = async (condition) => {
    try {
        const data = await UsersModel.findAll(condition);
        return common.data(data);
    } catch (error) {
        return error;
    };
};

// sign up users
exports.creteUser = async (data) => {
    try {
        const newUserData = await UsersModel.create(data);
        delete newUserData.dataValues.password;
        await userCache.setCacheData(newUserData.dataValues.id, newUserData.dataValues);
        return common.data(newUserData);
    } catch (error) {
        return error;
    };
};

// update users
exports.updateUser = async (id, update) => {
    try {
        await UsersModel.updateOne(update, { where: { id } });
        const data = await UsersModel.findOne({ where: { id }, attributes: { exclude: ['password'] }, });
        await userCache.setCacheData(data.dataValues.id, data.dataValues);
        return common.data(data);
    } catch (error) {
        return error;
    };
};

// delete users
exports.deleteUser = async (email) => {
    try {
        return await UsersModel.remove({ where: { email } });
    } catch (error) {
        return error;
    };
};


//  Upload CSV
exports.csvUpload = async (data) => {
    try {
        const newCsvData = await userClientModel.create(data);
        await userCache.setCacheData(common.data.id, common.data);
        return common.data(newCsvData);
    } catch (error) {
        return error;
    }
};

//  Find Contact
exports.findContact = async (id) => {
    try {
        const data = await userClientModel.findOne({ first_name: id })
        .populate('user');
        return common.data(data);
        } catch (error) {
            return error;
        }
    }


// list of permission route
exports.listOfRoute = async (operationsName, role) => {
        try {
            let condition = {};
            if (operationsName) {
                condition = { where: { operationsName } }
            };
            if (role) {
                condition = { where: { role } }
            };
            const listOfPermission = await model.permission.findAll(condition);
            return common.data(listOfPermission);
        } catch (error) {
            return error;
        };
    };

    //find one route or permission name
    exports.findOnePermission = async (condition) => {
        try {
            const data = await model.permission.findOne(condition);
            return common.data(data);
        } catch (error) {
            return error;
        };
    };

    // add permission route
    exports.addPermission = async ({ operationsName, role, routes }) => {
        try {
            const bodyData = { operationsName, role, routes };
            const data = await model.permission.create(bodyData);
            return common.data(data);
        } catch (error) {
            return error;
        };
    };

    //delete permission route
    exports.deletePermission = async (operationsName, role) => {
        try {
            return await model.users.destroy({ where: { operationsName, role } });
        } catch (error) {
            return error;
        };
    };