const nullCheck = require("../common/indexOfCommon");
const contactsCache = require("../cache/usersCacheRequest");
const contactsModel = require("../models/contactsModel")


//  Find Contact
exports.findContact = async (_id) => {
    try {
        const data = await contactsModel.findOne({ _id }).populate("businessId");
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

//  List of Contact
exports.allCOntacts = async (condition) => {
    try {
        const data = await contactsModel.find(condition);
        return nullCheck.data(data);
    } catch (error) {

    };
};

//  Upload CSV
exports.csvUpload = async (csvData) => {
    try {
        const newCsvData = await contactsModel.create(csvData);
        await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newCsvData);
    } catch (error) {
        return error;
    };
};

//  Update Contact
exports.updateContact = async (businessId, bodyData, updatedAt) => {
    try {
        const updatedContact = await contactsModel.findOneAndUpdate({ $and: [{ _id: bodyData._id }, { business: businessId }] }, {
            $set: { bodyData, updatedAt }
        },
        { new: true });
        // await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(updatedContact);
    } catch (error) {
        return error;
    };
};

//  Update Tags
exports.updateTAgs = async (_id, tags) => {
    try {
        const updatedContact = await contactsModel.updateMany(
            { _id: { $in: _id } },
            { $set: { tags } }
        );
        // await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(updatedContact);
    } catch (error) {
        return error;
    };
};

//  Delete Contact
exports.deleteContact = async (condition) => {
    console.log('condition: ', condition);
    try {
        const data = await contactsModel.deleteOne(condition);
        console.log('data: ', data);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};
