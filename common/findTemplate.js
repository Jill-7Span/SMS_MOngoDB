exports.findTemplate = async (req) => {
    const businessId = req.business._id; 
    const { templateId, search } = req.query;
    let condition = {};
    if (search) {
        condition = {
            $and: [
                { businessId },
                {
                    $or: [
                        { template: { $regex: search } },
                        { category: { $regex: search } },
                    ]
                }
            ]
        }
    } else if (templateId) {
        condition = {
            _id: templateId
        }
    }
    return condition;
};