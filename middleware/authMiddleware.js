const model = require("../models/db");
const jwt = require('jsonwebtoken');
const env = require("../common/env");

exports.authOfUsers = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];
    jwt.verify(tokenId, env.SECRET_KEY, async (err, user) => {
        try {
            const routes = req.baseUrl + req.route.path;
            const roleFromToken = user.role;
            if (roleFromToken == "ADMIN") {
                console.log("admin Middleware Check is Successfully");
                req.user = user;
                next();
            } else {
                const authFromDatabase = await model.permission.findOne({ where: { role: roleFromToken, routes } });
                const roleFromDatabase = authFromDatabase.dataValues.role;
                if (authFromDatabase && (roleFromDatabase == roleFromToken)) {
                    console.log("Auth Middleware Check is Successfully");
                    req.user = user;
                    next();
                }
            }
        } catch (error) {
            return res.status(404).json({ error: err.message });
        }
    })
};

