const smsService = require("./smsService");
const status = require("../common/indexOfCommon");
const condition = require("../common/indexOfCommon");
const contacts = require("../contacts/contactsService");
const template = require("../template/templateService");


exports.sendSms = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { searchTags } = req.body;
        const contactCondition = await condition.listOfNumber(searchTags, businessId);
        const allContacts = await contacts.allContacts(contactCondition);
        const templateContact = await condition.findTemplate(req);
        const smsTemplate = await template.readTemplate(templateContact);
        const numberList = allContacts.map(({ contactNumber }) => contactNumber);
        const smsDetails = {
            message: smsTemplate[0].template,
            number: numberList
        };
        return status.success(res,"200",smsDetails)
    } catch (error) {
        return error;
    }
};