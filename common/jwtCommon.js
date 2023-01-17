const jwt = require('jsonwebtoken');
const env = require("../common/env");


// jwt token
exports.tokenJwt = (users) => {
    const tokenData = {
        _id: users.id,
        role: users.role,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    };
    const token = jwt.sign(tokenData, env.SECRET_KEY);
    return token;
};
