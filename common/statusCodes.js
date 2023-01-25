//  Status Codes

exports.error = (res, statusCode, errors) => {
    console.log('errors: ', errors);
    return res.status(statusCode).json({
        statusCode: statusCode,
        Message: errors.message,
    });
};

exports.success = (res, statusCode, data) => {
    const key = res.req.route.path;
    return res.status(statusCode).json({
        statusCode: statusCode,
        [key]: data,        // Dynamic Key to JSON
    });
};
