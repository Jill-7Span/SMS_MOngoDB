const bcrypt = require('bcrypt');
const businessService = require("./businessService");
const businessCache = require("../cache/usersCacheRequest");
const jwt = require("../common/jwtCommon");
const status = require("../common/statusCodes");



// get business
exports.businessDetails = async (req, res) => {
    try {
        const businessId = req.query.id;
        const businessCacheData = await businessCache.getCacheData(businessId);
        if (businessCacheData != null) {
            return res.json(JSON.parse(businessCacheData));
        } else {
            const existingBusiness = await businessService.getBusinessData({ _id: businessId });
            await businessCache.setCacheData(businessId, existingBusiness);
            return status.success(res, "200", existingBusiness);
        }
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// get Business
exports.businessList = async (req, res) => {
    try {
        const { emailSearch, numberSearch, size, page } = req.query;
        let condition = {};
        if (emailSearch || numberSearch) {
            condition = {
                $or: [
                    { email: { $regex: emailSearch } },
                    { contactNumber: { $regex: numberSearch } },
                ]
            };
        } else if (size && page) {
            condition = {
                limit: parseInt(size),
                offset: parseInt(size) * parseInt((page - 1)),
            };
        } else if (condition = {}) {
            condition = {};
        }
        const business = await businessService.getBusinessList(condition);
        return status.success(res, "200", business);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  Sign Up
exports.businessSignUp = async (req, res) => {
    const bodyData = req.body;
    try {
        const existingBusiness = await businessService.getBusinessData(
            {
                $or: [
                    { email: bodyData.email },
                    { contactNumber: bodyData.contactNumber }
                ]
            });
        if (!existingBusiness) {
            if (bodyData.password === bodyData.confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                bodyData.password = await bcrypt.hash(bodyData.password, salt);
                const newBusiness = await businessService.creteBusiness(bodyData);
                delete newBusiness.password
                const token = jwt.tokenJwt(newBusiness);
                const newBusinessDetail = { ...newBusiness, token };
                return status.success(res, "201", newBusinessDetail);
            } else {
                return status.error(res, "403", "Password Didn't Match");
            }
        } else {
            return status.error(res, "403", "User Already Exits");
        }
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// log in
exports.businessLogIn = async (req, res) => {
    try {
        const { password, email } = req.body;
        const business = await businessService.getBusinessData({ email });
        if (!business) return status.invalidDetails;
        const businessData = {
            firstName: business.firstName,
            lastName: business.lastName,
        }
        if (business) {
            const businessPassword = business.password;
            const passwordCompare = await bcrypt.compare(password, businessPassword);
            if (passwordCompare) {
                const token = jwt.tokenJwt(business);
                return status.success(res, "200", { ...businessData, token });
            } else {
                return status.error(res, "401", "Invalid Details");
            }
        } else {
            return status.error(res, "401", "Invalid Details");;
        }
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// update Business
exports.businessUpdate = async (req, res) => {
    try {
        const body = req.body;
        const tokenId = req.business._id;
        const existingBusinessData = await businessService.getBusinessData({ _id: tokenId });
        let update = {};
        const existingContactNumberOrEmail = await businessService.getBusinessList({
            $or: [
                { contactNumber: body.contactNumber },
                { email: req.body.email }
            ]
        });
        if ((req.body.hasOwnProperty("contactNumber")) || (req.body.hasOwnProperty("email"))) {
            if ((existingContactNumberOrEmail.length == 0) || (existingContactNumberOrEmail[0]._id === tokenId)) {
                update.contactNumber = parseInt(body.contactNumber);
                update.email = body.email;
            } else {
                for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
                    const element = existingContactNumberOrEmail[i];
                    if ((element._id != tokenId) && (element.contactNumber === parseInt(body.contactNumber))) {
                        return status.error(res, "403", "Number Already exits");
                    }
                    if ((element._id != tokenId) && (element.email === body.email)) {
                        return status.error(res, "403", "Email Already exits");;
                    }
                };
            }
        };
        update.updatedAt = new Date();
        const updatedData = await businessService.updateBusiness(existingBusinessData._id, update);
        const token = status.tokenJwt(updatedData);
        return status.success(res, "200", { ...updatedData, token });
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// change password
exports.businessPasswordChange = async (req, res) => {
    try {
        const email = req.business.email;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const update = {};
        if (newPassword === confirmPassword) {
            const business = await businessService.getBusinessData({ where: { email } });
            bcrypt.compare(oldPassword, business.password, async (error, data) => {
                if (error) {
                    return status.error(res, "400", error)
                };
                if (data) {
                    const salt = await bcrypt.genSalt(10);
                    update.password = await bcrypt.hash(newPassword, salt);
                    update.updated_at = new Date();
                    await businessService.updateBusiness(business._id, update);
                    return status.updated;
                } else {
                    return status.error(res, "401", "Incorrect Credentials");
                }
            });
        } else {
            return status.passwordNOtMatch;
        };
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// delete Business
exports.businessDelete = async (req, res) => {
    try {
        const _id = req.business._id;
        await businessService.deleteBusiness(_id);
        // await businessCache.deleteCacheData(req.query._id, existingBusiness);
        return status.error(res, "200", "Deleted");
    } catch (error) {
        return status.error(res, "500", error);
    };
};

