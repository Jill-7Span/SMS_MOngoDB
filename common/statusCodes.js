//  Status Codes

exports.serverError = (res,error) => {
    return res.status(403).json({
        statusCode: 403,
        Message: error + ' Server error occurred'
    });
};

exports.invalidDetails = (res) => {
    return res.status(404).json({
        statusCode: 404,
        error: "invalid details"
    });
};

exports.success = (res, data) => {
    const key = res.req.route.path;
    return res.status(200).json({
        statusCode: 200,
        [key]: data,        // Dynamic Key to JSON
    });
};

exports.numberExist = (res) => {
    return res.status(400).json({
        statusCode: 400,
        Message: "Contact Number Already Exits",
    });
};

exports.emailExist = (res) => {
    return res.status(400).json({
        statusCode: 400,
        Message: "Contact Email Already Exits",
    });
};

exports.updated = (res) => {
    return res.status(200).json({
        statusCode: 200,
        Message: "Updated Successfully",
    });
};

exports.incorrectPassword = (res) => {
    return res.status(400).json({
        statusCode: 400,
        Message: "Your Password Is Incorrect",
    });
};

exports.passwordNOtMatch = (res) => {
    return res.status(400).json({
        statusCode: 400,
        Message: "Password Didn't Match",
    });
}; 

exports.alreadyExits = (res) => {
    return res.status(403).json({
        statusCode: 403,
        Message: "Already Exist",
    });
}; 

exports.unauthorized = (res) => {
    return res.status(403).json({
        statusCode: 403,
        Message: "You are not authorize to this page"
    });
}; 

exports.deleted = (res) => {
    return res.status(200).json({
        statusCode: 200,
        Message: "Deleted Successfully"
    });
}