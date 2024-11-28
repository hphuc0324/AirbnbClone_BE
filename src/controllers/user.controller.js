const { ForbiddenRequest, BadRequest, InternalServerError } = require('../constants/error.respone');
const { OK } = require('../constants/success.respone');
const userModel = require('../models/user.model');
const UserService = require('../services/user.service');
const { selectData } = require('../utils/dataTransform');

const USER_PROFILE = selectData([
    'user_uid',
    'user_name',
    'user_avatar',
    'user_description',
    'user_profileField',
    'user_hobbies',
]);

class UserController {
    getPersonalInfo = async (req, res) => {
        const { uid } = req.user;

        if (!uid) {
            throw new ForbiddenRequest();
        }

        const select = selectData(['user_name', 'user_email', 'user_phoneNumber', 'user_address']);

        const user = await UserService.getUserByUid({ uid: uid, select: select });

        new OK({
            message: 'Get personal information successfully',
            metadata: user,
        }).send(res);
    };

    updatePersonalInfo = async (req, res) => {
        const { uid } = req.user;
        const { name, phoneNumber, address } = req.body;

        if (!name || !phoneNumber || !address) {
            throw new BadRequest();
        }

        const fieldsToUpdate = {
            user_name: name,
            user_phoneNumber: phoneNumber,
            user_address: address,
        };

        new OK({
            message: 'Update user personal information successfully',
            metadata: await UserService.updateUser({ uid, fieldsToUpdate }),
        }).send(res);
    };

    getUserProfile = async (req, res) => {
        const { uid } = req.params;

        if (!uid) {
            throw new ForbiddenRequest();
        }

        const user = await UserService.getUserByUid({ uid, USER_PROFILE });

        new OK({
            message: 'Get user profile successfully',
            metadata: user,
        }).send(res);
    };

    updateUserProfile = async (req, res) => {
        const { uid } = req.user;

        const { profileField, hobbies } = req.body;

        if (!profileField && !hobbies) {
            throw new BadRequest();
        }

        if (profileField) {
            await UserService.updateUserProfileField({ uid, profileField });
        } else {
            await UserService.updateUserHobbies({ uid, hobbies });
        }

        new OK({
            message: 'Update user profile fields successfully',
            metadata: await UserService.getUserByUid({ uid, USER_PROFILE }),
        }).send(res);
    };

    updateUserAvatar = async (req, res) => {
        const { uid } = req.user;
        const file = req.file;

        if (!file) {
            throw new BadRequest('File not found');
        }

        const foundUser = await userModel.findOneAndUpdate(
            {
                user_uid: uid,
            },
            {
                user_avatar: file.path,
            },
            {
                new: true,
            },
        );

        if (!foundUser) {
            throw new InternalServerError('Update user avatar failed');
        }

        new OK({
            message: 'Update user avatar successfully',
            metadata: foundUser.user_avatar,
        }).send(res);
    };

    updateUserDescription = async (req, res) => {
        const { uid } = req.user;
        const { description } = req.body;

        if (!description) {
            throw new BadRequest();
        }

        const fieldsToUpdate = {
            user_description: description,
        };

        await UserService.updateUser({ uid, fieldsToUpdate });

        new OK({
            message: 'Update user description successfully',
            metadata: description,
        }).send(res);
    };
}

module.exports = new UserController();
