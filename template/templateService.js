
const nullCheck = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const templateModel = require("../models/templateModule");


//  Add Template
exports.addTemplate = async (templateData) => {
    try {
        const addedTemplate = await templateModel.create(templateData);
        await userCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(addedTemplate);
    } catch (error) {
        return error;
    }
};

//  Read Template
exports.readTemplate = async (condition) => {
    try {
        const readTemplate = await templateModel.find(condition).populate("user", "-_id firstName lastName");
        await userCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(readTemplate);
    } catch (error) {
        return error;
    }
};

//  Update Template
exports.updateTemplate = async (_id, userId, category, template) => {
    console.log('_id, userId, category, template: ', _id, userId, category, template);
    try {
        const data = await templateModel.findOneAndUpdate({$and:[{_id},{user:userId}]}, {
            $set: { category, template }
        },
            { new: true });     // new : true for send updated data
        console.log('data: ', data);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }
};

//  Delete Template
exports.deleteTemplate = async (_id) => {
    console.log('_id: ', _id);
    try {
        const data = await templateModel.deleteOne({ _id });
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }
};
