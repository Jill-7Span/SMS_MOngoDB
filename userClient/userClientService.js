const nullCheck = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");
const userClientModel = require("../models/user_client")

//  db.coll.find({"tags" : { $in : ['etc1']  } } );

//  Upload CSV
exports.csvUpload = async (csvData) => {
    try {
        console.log('csvData: ', csvData);
        const newCsvData = await userClientModel.create(csvData);
        await userCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newCsvData);
    } catch (error) {
        return error;
    }
};

//  Upload Vcf or vCard
exports.vcfUpload = async (vcfData) => {
    try {
        const newVcfData = await userClientModel.create(vcfData);
        await userCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newVcfData);
    } catch (error) {
        return error;
    }
};

//  Find Contact
exports.findContact = async (id) => {
    try {
        const data = await userClientModel.findOne({ _id: id }).populate("user");
        return nullCheck.data(data);
    } catch (error) {
        return error;
    }
};
