//  Status Codes

exports.error = (res, statusCode, error) => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        Message: error,
    });
};

exports.success = (res, statusCode, data) => {
    const key = res.req.route.path;
    return res.status(statusCode).json({
        statusCode: statusCode,
        [key]: data,        // Dynamic Key to JSON
    });
};
