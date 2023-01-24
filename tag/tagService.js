const nullCheck = require("../common/nullChecK");
const tagsModel = require("../models/tagsModel");

//  Find Tag
exports.findTags = async (tagName, businessId) => {
    try {
        const tags = await tagsModel.find({$and:[{ tag: tagName },{ businessId }]})
        return nullCheck.data(tags);
    } catch (error) {
        return error;
    };
};

//  All Tags
exports.allTags = async (businessId) => {
    try {
        const allTags = await tagsModel.find({ businessId })
        return nullCheck.data(allTags);
    } catch (error) {
        return error
    }
}

//  Create Tag
exports.createTag = async (tagData) => {
    try {
        const newTagsData = await tagsModel.create(tagData);
        console.log('newTagsData: ', newTagsData);
        // await tagCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newTagsData);
    } catch (error) {
        return error;
    };
};

//  Delete Tag
exports.deleteTag = async (_id) => {
    try {
        const data = await tagsModel.findByIdAndDelete(_id);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};