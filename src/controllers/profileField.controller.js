const { OK } = require('../constants/success.respone');
const ProfileFieldService = require('../services/profileField.service');

class ProfileFieldController {
    getAllProfileFields = async (req, res) => {
        new OK({
            message: 'Get all profile fields successfully',
            metadata: await ProfileFieldService.getAllProfileFields(),
        }).send(res);
    };
}

module.exports = new ProfileFieldController();
