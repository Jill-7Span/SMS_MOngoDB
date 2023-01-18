const Joi = require('joi');
const status = require("../common/statusCodes");

exports.loginBusiness = (req, res, next) => {
    const validation = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(false);  //.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return status.error(res,"400",error);
    } else {
        console.log("LogIn Validation Check Successfully");
        next();
    }
};
