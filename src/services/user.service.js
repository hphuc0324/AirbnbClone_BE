const { Api404Error, CustomError, InternalServerError } = require('../constants/error.respone');
const { NOT_FOUND } = require('../constants/httpStatusCode');
const userModel = require('../models/user.model');

class UserService {
    static getUserByUid = async ({ uid, unSelect = { __v: 0 }, select = {} }) => {
        const filters = select ? select : unSelect;

        const user = await userModel
            .findOne({ user_uid: uid })
            .select({ ...filters })
            .populate({
                path: 'user_hobbies',
                select: ['hobby_name', 'hobby_icon', '-_id'],
                populate: {
                    path: 'hobby_icon',
                    select: ['icon_url', '-_id'],
                },
            })
            .lean()
            .exec();

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
