const { ForbiddenRequest, BadRequest } = require('../constants/error.respone');
const { OK } = require('../constants/success.respone');
const UserService = require('../services/user.service');
const { selectData } = require('../utils/dataTransform');

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

        const select = selectData([
            'user_uid',
            'user_name',
            'user_avatar',
            'user_description',
            'user_profileField',
            'user_hobbies',
        ]);

        const user = await UserService.getUserByUid({ uid, select });

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
            new OK({
                message: 'Update user profile fields successfully',
                metadata: await UserService.updateUserProfileField({ uid, profileField }),
            }).send(res);
        } else {
            console.log('User Controller::update user profile hobbies');
        }
    };
}

module.exports = new UserController();
