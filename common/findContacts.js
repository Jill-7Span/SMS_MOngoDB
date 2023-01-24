const tagData = require("../tag/tagService")

exports.listOfNumber = async (searchTags, businessId) => {
    const tagId = await tagData.findTags(searchTags, businessId);
    let condition = {};
    if (searchTags) {
        condition = {
            $and: [
                { businessId },
                { tags: tagId._id },
            ]
        };
    } else if (condition) {
        condition = { businessId };
    };
    return condition;
};