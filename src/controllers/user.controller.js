const { ForbiddenRequest, BadRequest } = require('../constants/error.respone');
const { OK } = require('../constants/success.respone');
const UserService = require('../services/user.service');
const { getDataFields } = require('../utils/dataTransform');

class UserController {
    getPersonalInfo = async (req, res) => {
        const { uid } = req.user;

        if (!uid) {
            throw new ForbiddenRequest();
        }

        const user = await UserService.getUserByUid({ uid: uid });

        const userInfo = getDataFields({
            fields: ['user_name', 'user_email', 'user_phoneNumber', 'user_address'],
            data: user,
        });

        new OK({
            message: 'Get personal information successfully',
            metadata: userInfo,
        }).send(res);
    };

    updatePersonalInfo = async (req, res) => {
        const { uid } = req.user;
        const { name, phoneNumber, address } = req.body;

        console.log('req.body::', req.body);

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

        const user = await UserService.getUserByUid({ uid });

        const userProfile = getDataFields({
            fields: ['user_name', 'user_avatar', 'user_description', 'user_profileField', 'user_hobbies'],
            data: user,
        });

        new OK({
            message: 'Get user profile successfully',
            metadata: userProfile,
        }).send(res);
    };
}

module.exports = new UserController();
