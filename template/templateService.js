const nullCheck = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const templateModel = require("../models/templateModule")

//  db.coll.find({"tags" : { $in : ['etc1']  } } );

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
exports.readTemplate = async (user) => {
    try {
        const readTemplate = await templateModel.find(user);
        await userCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(readTemplate);
    } catch (error) {
        return error;
    }
};

//  Update Template
exports.updateTemplate = async (_id, category, template, status) => {
    try {
        const data = await templateModel.findOneAndUpdate({ _id }, {
            $set: { category, template, status }
        },
            { new: true });     // new : true for send updated data
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }       
};

//  Delete Template
exports.deleteTemplate = async (_id, user) => {
    try {
        const data = await templateModel.deleteOne({ _id }, { user });
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }
};
