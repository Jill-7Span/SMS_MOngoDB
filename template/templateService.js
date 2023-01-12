const common = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const userClientModel = require("../models/user_client")

//  db.coll.find({"tags" : { $in : ['etc1']  } } );

//  Add Template
exports.addTemplate = async (csvData) => {
    try {
        const newCsvData = await userClientModel.create(csvData);
        await userCache.setCacheData(common.data.id, common.data);
        return common.data(newCsvData);
    } catch (error) {
        return error;
    }
};

//  Read Template
exports.readTemplate = async (vcfData) => {
    try {
        const newVcfData = await userClientModel.create(vcfData);
        await userCache.setCacheData(common.data.id, common.data);
        return common.data(newVcfData);
    } catch (error) {
        return error;
    }
};

//  Update Template
exports.updateTemplate = async (id) => {
    try {
        const data = await userClientModel.findOne({ _id: id }).populate('user');
        return common.data(data);
    } catch (error) {
        return error;
    }
};

//  Delete Template
exports.deleteTemplate = async (id) => {
    try {
        const data = await userClientModel.findOne({ _id: id }).populate('user');
        return common.data(data);
    } catch (error) {
        return error;
    }
};
