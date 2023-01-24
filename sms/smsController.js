const smsService = require("./smsService");
const status = require("../common/indexOfCommon");
const condition = require("../common/indexOfCommon");
const contacts = require("../contacts/contactsService");
const template = require("../template/templateService");

exports.sendSms = async (req, res) => {
    try {
        const contactCondition = await condition.listOfNumber(req);
        const allContacts = await contacts.allContacts(contactCondition);
        const templateContact = await condition.findTemplate(req);
        const smsTemplate = await template.readTemplate(templateContact);

        const numberList = allContacts.map(({ contactNumber }) => contactNumber);
        const smsDetails = {
            message: smsTemplate[0].template,
            number: numberList
         };
        return res.send(smsDetails)
    } catch (error) {
        return error;
    }
}