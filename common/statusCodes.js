//  Status Codes

exports.serverError = (res) => {
    return res.status(403).json({
        statusCode: 403,
        message: error + ' Server error occurred'
    });
};

exports.invalidDetails = (res) => {
    return res.status(404).json({
        statusCode: 404,
        error: "invalid details"
    });
};

exports.success = (res, data) => {
    return res.status(200).json({
        statusCode: 200,
        users: data,
    });
};