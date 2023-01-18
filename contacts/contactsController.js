const businessClientService = require("./contactsService");
const status = require("../common/indexOfCommon");
const csvtojson = require("csvtojson")
const path = require("path");
const fs = require("fs");

//  Find Contact
exports.findContact = async (req, res) => {
    try {
        const id = req.body.id
        const uploadedCsv = await businessClientService.findContact(id);
        return status.success(res, "200", uploadedCsv);
    } catch (error) {
        return status.error(res, "400", error);
    };
};
//  CSV Upload
exports.csvUpload = async (req, res) => {
    try {
        const businessId = req.business._id;
        const document = path.join(__dirname, `../temp/${req.file.originalname}`)
        csvtojson()
            .fromFile(document)
            .then(async csvData => {
                csvData.forEach((obj) => {
                    obj['business'] = businessId;
                    obj['tags']= req.query.tags;
                });
                fs.unlink(document, (error) => {
                    if (error) {
                        return status.error(res, "400", error);
                    }
                })
                console.log(`Temp File ${document} is deleted`);
                const csv = await businessClientService.csvUpload(csvData);
                return status.success(res, "200", csv);
            })
    } catch (error) {
        return status.error(res, "400", error);
    };
};


