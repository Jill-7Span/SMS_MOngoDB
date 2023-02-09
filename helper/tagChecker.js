const tags = require("../tag/tagService");


exports.alreadyExistedTag = async (tagName, businessId) => {
    console.log('tagName, businessId: ', tagName, businessId);
    try {
        // const existedTag = await tags.findTags(tagName, businessId);
        // console.log('existedTag: ', existedTag);
        if (1==1) {
            const tag = {
                tag: tagName,
                businessId: businessId
            };
            return tag;
        } else {
            return "Already Existed Tag"
        }
    } catch (error) {
        return error;
    };
};

exports.findTag = async (tagName, businessId) => {
    try {
        const existedTag = await tags.findTags(tagName, businessId);
        if (existedTag) {
            return existedTag;
        } else {
            return "Not Found Tag"
        }
    } catch (error) {
        return error;
    };
};