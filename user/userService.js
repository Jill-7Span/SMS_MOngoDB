const model = require("../models/db");
const nullCheck = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const UsersModel = require("../models/usersModel");


//get user
exports.getUserData = async (condition) => {
    try {
        const data = await UsersModel.findOne(condition).select("+password");       
        // .select is use to het password when in schema its select false`
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

// get users
exports.getUsersList = async (condition) => {
    try {
        const data = await UsersModel.find(condition);
        return data;
    } catch (error) {
        return error;
    };
};

// sign up users
exports.creteUser = async (data) => {
    try {
        const newUserData = await UsersModel.create(data);
        // await userCache.setCacheData(newUserData.dataValues._id, newUserData.dataValues);
        return nullCheck.data(newUserData);
    } catch (error) {
        return error;
    };
};

// update users
exports.updateUser = async (_id, update) => {
    try {
        const data = await UsersModel.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
        // await userCache.setCacheData(data.dataValues._id, data.dataValues);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

// delete users
exports.deleteUser = async (_id) => {
    try {
        return await UsersModel.deleteOne({ _id });
    } catch (error) {
        return error;
    };
};

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
        return nullCheck.data(listOfPermission);
    } catch (error) {
        return error;
    };
};

//find one route or permission name
exports.findOnePermission = async (condition) => {
    try {
        const data = await model.permission.findOne(condition);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

// add permission route
exports.addPermission = async ({ operationsName, role, routes }) => {
    try {
        const bodyData = { operationsName, role, routes };
        const data = await model.permission.create(bodyData);
        return nullCheck.data(data);
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