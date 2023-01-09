// null check function
exports.data = (data) => {
    if (data == null) {
        return null;
    } else {
        if (data.dataValues == null || undefined) {
            return data;
        } else {
            return data.dataValues;
        }
    }
};


