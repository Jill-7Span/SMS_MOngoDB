const smsService = require("./smsService");
const status = require("../common/indexOfCommon");
const condition = require("../common/indexOfCommon");
const contacts = require("../contacts/contactsService");
const template = require("../template/templateService");

exports.sendSms = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { searchTags } = req.body;
        // const businessId = "63cfcbf8d78236b43c9253ce";
        // console.log('businessId: ', businessId);
        // const searchTags = "node";
        // console.log('searchTags: ', searchTags);

        const contactCondition = await condition.listOfNumber(searchTags, businessId);
        const allContacts = await contacts.allContacts(contactCondition);
        const templateContact = await condition.findTemplate(req);
        const smsTemplate = await template.readTemplate(templateContact);
        console.log('smsTemplate: ', smsTemplate);

        const numberList = allContacts.map(({ contactNumber }) => contactNumber);
        const smsDetails = {
            message: smsTemplate[0].template,
            number: numberList
        };
        console.log('smsDetails: ', smsDetails);
        return res.send(smsDetails)
    } catch (error) {
        return error;
    }
}