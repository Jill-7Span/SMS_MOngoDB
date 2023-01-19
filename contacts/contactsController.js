const contactsService = require("./contactsService");
const status = require("../common/indexOfCommon");
const csvtojson = require("csvtojson")
const path = require("path");
const fs = require("fs");

//  Find Contact
exports.findContact = async (req, res) => {
    try {
        const id = req.body.id
        const uploadedCsv = await contactsService.findContact(id);
        return status.success(res, "200", uploadedCsv);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  List Of Contacts
exports.allContacts = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { searchTags } = req.query;
        let condition = {};
        if (searchTags) {
            condition = {
                $and: [
                    { businessId },
                    { tags: { $regex: searchTags } },
                ]
            };
        } else if (condition) {
            condition = { businessId };
        }

        const allCOntacts = await contactsService.allCOntacts(condition);
        return status.success(res, "200", allCOntacts)
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  CSV Upload
exports.csvUpload = async (req, res) => {
    try {
        const businessId = req.business._id;
        const tags = req.query.tags;
        const document = path.join(__dirname, `../temp/${req.file.originalname}`);
        csvtojson()
            .fromFile(document)
            .then(async csvData => {
                csvData.forEach((obj) => {
                    obj['businessId'] = businessId;
                    obj['tags'] = tags;
                });
                fs.unlink(document, (error) => {
                    if (error) {
                        return status.error(res, "400", error);
                    };
                });
                console.log(`Temp File ${document} is deleted`);
                const csv = await contactsService.csvUpload(csvData);
                return status.success(res, "201", csv);
            });
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Update Contact
exports.updateContact = async (req, res) => {
    try {
        const businessId = req.business._id;
        const bodyData = req.body;
        const updatedAt = new Date();
        const updatedContact = await contactsService.updateContact(businessId, bodyData, updatedAt);
        // return status.success(res, updatedTemplate);

    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  Tags Update
exports.updateTags = async (req, res) => {
    try {
        const { _id, tags } = req.body;
        const updatedTag = await contactsService.updateTAgs(_id, tags);
        return status.success(res, "200", updatedTag)
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        const _id = req.query._id;
        await contactsService.deleteContact(_id);
        return status.success(res, "200", "Deleted Successfully")
    } catch (error) {
        return status.error(res, "500", error);
    };
};
