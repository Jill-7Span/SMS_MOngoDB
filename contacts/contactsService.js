const nullCheck = require("../common/indexOfCommon");
const businessCache = require("../cache/usersCacheRequest");
const businessModel = require("../models/contactsModel")


//  Find Contact
exports.findContact = async (id) => {
    try {
        const data = await businessModel.findOne({ _id: id }).populate("business");
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }
};

//  Upload CSV
exports.csvUpload = async (csvData) => {
    try {
        const newCsvData = await businessModel.create(csvData);
        await businessCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newCsvData);
    } catch (error) {
        return error;
    }
};
