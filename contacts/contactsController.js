const contactsService = require("./contactsService");
const tags = require("../tag/tagService");
const status = require("../common/indexOfCommon");
const allContact = require("../common/findContacts");
const helper = require("../helper/indexOfHelper");

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
        const condition = await allContact.listOfNumber(searchTags, businessId);
        const allContacts = await contactsService.allContacts(condition);
        // console.log("all contacts", allContacts.map(({ contactNumber }) => contactNumber));
        return status.success(res, "200", allContacts)
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  CSV Upload
exports.csvUpload = async (req, res) => {
    try {
        const csvData = await helper.csvToJson(req, res);
        const csv = await contactsService.csvUpload(csvData);
        return status.success(res, "201", csv);
    }
    catch (error) {
        return status.error(res, "500", error);
    };
}


// Update Contact
exports.updateContact = async (req, res) => {
    try {
        const businessId = req.business._id;
        const bodyData = req.body;
        const updatedAt = new Date();
        const updatedContact = await contactsService.updateContact(businessId, bodyData, updatedAt);
        return status.success(res, updatedContact);

    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Update Contact Tags
exports.updateContactTags = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { _id, tagName } = req.body;
        const tag = await tags.findTags(tagName, businessId);
        const updatedTag = await contactsService.updateContactTags(_id, tagName);
        return status.success(res, "200", updatedTag);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        const _id = req.query._id;
        const deletedContact = await contactsService.deleteContact(_id);
        return status.success(res, "200", `Deleted Successfully ${deletedContact.firstName + " " + deletedContact.contactNumber}`)
    } catch (error) {
        return status.error(res, "500", error);
    };
};
