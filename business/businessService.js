const nullCheck = require("../common/indexOfCommon");
const businessCache = require("../cache/cacheRequest");
const businessModel = require("../models/businessModel");


//get business
exports.getBusinessData = async (condition) => {
    try {
        const data = await businessModel.findOne(condition).select("+password");       
        // .select is use to het password when in schema its select false`
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

// get Business
exports.getBusinessList = async (condition) => {
    try {
        const data = await businessModel.find(condition);
        return data;
    } catch (error) {
        return error;
    };
};

// sign up Business
exports.creteBusiness = async (data) => {
    try {
        const newBusinessData = await businessModel.create(data);
        // await businessCache.setCacheData(newBusinessData.dataValues._id, newBusinessData.dataValues);
        return nullCheck.data(newBusinessData);
    } catch (error) {
        return error;
    };
};

// update Business
exports.updateBusiness = async (_id, update) => {
    try {
        const data = await businessModel.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
        // await businessCache.setCacheData(data.dataValues._id, data.dataValues);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

// delete Business
exports.deleteBusiness = async (_id) => {
    try {
        return await businessModel.deleteOne({ _id });
    } catch (error) {
        return error;
    };
};
