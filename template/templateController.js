const templateService = require("./templateService");
const status = require("../common/indexOfCommon");

//  Add Template
exports.addTemplate = async (req, res) => {
    try {
        const { template, category } = req.body;
        const templateData = {
            firstName: "jill",  // pass from token
            lastName: "patel",  // pass from token
            category: category,
            template: template,
            user: "63bbb595682b2f69b0cf2989", // pass id from token
        };
        const createdTemplate = await templateService.addTemplate(templateData);
        console.log('createdTemplate: ', createdTemplate);
        return status.success(res, createdTemplate);
    } catch (error) {
        return status.serverError;
    }
};

//  Read Template
exports.readTemplate = async (req, res) => {
    try {
        const user = "63bbb595682b2f69b0cf2989";  // pass from token
        const readTemplate = await templateService.readTemplate(user);
        console.log('readTemplate: ', readTemplate);
        return status.success(res, readTemplate);
    } catch (error) {
        return status.serverError;
    }
};

//  Update Template
exports.updateTemplate = async (req, res) => {
    try {
        const { _id, category, template } = req.query;
        const status = "not approved"
        const updatedTemplate = await templateService.updateTemplate(_id, category, template, status);
        console.log('updatedTemplate: ', updatedTemplate);
        return status.success(res, updatedTemplate);
    } catch (error) {
        console.log('error: ', error);
        return status.serverError;
    }
};

//  Delete Template
exports.deleteTemplate = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = "63bbb595682b2f69b0cf2989";  // pass from token
        const deleteTemplate = await templateService.deleteTemplate(_id, user);
        return status.success(res, `deleted SMS Template was ${_id} ${deleteTemplate}`);
    } catch (error) {
        return status.serverError;
    }
};
