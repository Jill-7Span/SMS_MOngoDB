const Filter = require('bad-words');
const filter = new Filter();
const templateService = require("./templateService");
const status = require("../common/indexOfCommon");


//  Add Template
exports.addTemplate = async (req, res) => {
    try {
        const { template, category } = req.body;
        const massage = filter.clean(template);
        const templateData = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            category: category,
            template: massage,
            user: req.user._id,
        };
        const createdTemplate = await templateService.addTemplate(templateData);
        return status.success(res, createdTemplate);
    } catch (error) {
        return status.serverError(res, error);
    }
};

//  Read Template
exports.readTemplate = async (req, res) => {
    try {
        const user = req.user._id;  // pass from token
        const { templateId, search, globalSearch } = req.query;
        let condition = {};
        if (search) {
            condition = {
                $or: [
                    { template: { $regex: search } },
                    { category: { $regex: search } },
                ]
            }
        } else if (templateId) {
            condition = {
                $and: [
                    { _id: templateId },
                    { user }
                ]
            }
        } else if (globalSearch, user) {
            condition = {
                $and: [
                    { templateStatus: "public" },
                    // { _id: templateId },
                    { user }
                ]
            }
        } else if (condition) {
            condition = {}
        };
        const readTemplate = await templateService.readTemplate(condition);
        return status.success(res, readTemplate);
    } catch (error) {
        return status.serverError(res, error);
    }
};

//  Update Template
exports.updateTemplate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { _id, category, template } = req.query;
        if(userId === _id){
            const updatedTemplate = await templateService.updateTemplate(_id, userId, category, template);
            return status.success(res, updatedTemplate);
        }else{
            return status.unauthorized(res);
        }
    } catch (error) {
        return status.serverError(res, error);
    }
};

//  Delete Template
exports.deleteTemplate = async (req, res) => {
    try {
        const _id = req.query._id;
        const user = req.user._id;
        await templateService.deleteTemplate(_id, user);
        return status.deleted(res)
    } catch (error) {
        return status.serverError(res, error);
    }
};
