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
    var key = res.req.route.path;
    return res.status(200).json({
        statusCode: 200,
        [key]: data,        // Dynamic Key to JSON
    });
};