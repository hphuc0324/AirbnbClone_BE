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
            .populate({
                path: 'user_profileField.field',
                select: ['profileField_icon', 'profileField_placeholder'],
                populate: {
                    path: 'profileField_icon',
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

    static getUserProfile = async ({ uid }) => {
        const foundUser = await userModel
            .findOne({
                user_uid: uid,
            })
            .populate({
                path: 'user_profileField',
                select: ['profileField_icon', 'profileField_placeholder', '-__id'],
                populate: {
                    path: 'profileField_icon',
                    select: ['icon_url', '-_id'],
                },
            });

        if (!foundUser) {
            throw new Api404Error('User not found');
        }

        return foundUser;
    };

    static updateUserProfileField = async ({ uid, profileField }) => {
        let updatedUser = await userModel.findOneAndUpdate(
            {
                user_uid: uid,
                'user_profileField.field': profileField._id,
            },
            {
                $set: {
                    'user_profileField.$.value': profileField.value,
                },
            },
            {
                new: true,
            },
        );

        if (!updatedUser) {
            updatedUser = await userModel.findOneAndUpdate(
                { user_uid: uid },
                {
                    $push: {
                        user_profileField: {
                            field: profileField._id,
                            value: profileField.value,
                        },
                    },
                },
                {
                    new: true,
                },
            );
        }

        if (!updatedUser) {
            throw new InternalServerError();
        }

        return updatedUser.user_profileField;
    };

    static updateUserHobbies = async ({ uid, hobbies }) => {
        const foundUser = await userModel.findOne({ user_uid: uid });

        if (!foundUser) {
            throw new Api404Error('User not found');
        }

        foundUser.user_hobbies = hobbies;
        await foundUser.save();

        return foundUser.user_hobbies;
    };
}

module.exports = UserService;
