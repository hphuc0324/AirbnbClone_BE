const { ForbiddenRequest } = require('../constants/error.respone');
const { OK } = require('../constants/success.respone');
const UserService = require('../services/user.service');
const { getDataFields } = require('../utils/dataTransform');

class UserController {
    getPersonalInfo = async (req, res) => {
        const { uid } = req.user;

        console.log('req.user::', req.user);

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
}

module.exports = new UserController();
