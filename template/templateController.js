const Filter = require('bad-words');
const filter = new Filter();
const templateService = require("./templateService");
const status = require("../common/indexOfCommon");

//  Read Template
exports.readTemplate = async (req, res) => {
    try {
        const businessId = req.business._id;  // pass from token
        const { templateId, search, globalSearch } = req.query;
        let condition = {};
        if (search) {
            condition = {
                $and: [
                    {
                        $or: [
                            { template: { $regex: search } },
                            { category: { $regex: search } },
                        ]
                    },
                    { businessId }
                ]
            }
        } else if (templateId) {
            condition = {
                _id: templateId
            }
        } else if (condition) {
            condition = { businessId }
        };
        const readTemplate = await templateService.readTemplate(condition);
        return status.success(res, "200", readTemplate);
    } catch (error) {
        return status.error(res, "400", error);
    }
};

//  Add Template
exports.addTemplate = async (req, res) => {
    try {
        const { template, category } = req.body;
        const massage = filter.clean(template);
        const templateData = {
            category: category,
            template: massage,
            business: req.business._id,
        };
        const createdTemplate = await templateService.addTemplate(templateData);
        return status.success(res, "200", createdTemplate);
    } catch (error) {
        return status.error(res, "400", error);
    }
};

//  Update Template
exports.updateTemplate = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { _id, category, template } = req.query;
        if (businessId === _id) {
            const updatedTemplate = await templateService.updateTemplate(_id, businessId, category, template);
            return status.success(res, updatedTemplate);
        } else {
            return status.error(res,"400","You are Unauthorized to this page");
        }
    } catch (error) {
        return status.error(res, "400", error);
    }
};

//  Delete Template
exports.deleteTemplate = async (req, res) => {
    try {
        const _id = req.query._id;
        const business = req.business._id;
        await templateService.deleteTemplate(_id, business);
        return status.success(res,"200","Deleted")
    } catch (error) {
        return status.error(res, "400", error);
    }
};
