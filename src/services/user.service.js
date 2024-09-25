const { Api404Error, CustomError } = require('../constants/error.respone');
const { NOT_FOUND } = require('../constants/httpStatusCode');
const userModel = require('../models/user.model');

class UserService {
    static getUserByUid = async ({ uid }) => {
        const user = await userModel.findOne({ user_uid: uid }).lean();

        if (!user) {
            throw new CustomError('User not found', NOT_FOUND);
        }

        return user;
    };
}

module.exports = UserService;
