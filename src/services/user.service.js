const { Api404Error, CustomError, InternalServerError } = require('../constants/error.respone');
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

    static updateUser = async ({ uid, fieldsToUpdate }) => {
        const updatedUser = await userModel
            .findOneAndUpdate(
                { user_uid: uid },
                {
                    $set: fieldsToUpdate,
                },
                { new: true },
            )
            .lean();

        if (!updatedUser) {
            throw new InternalServerError();
        }

        return updatedUser;
    };
}

module.exports = UserService;
