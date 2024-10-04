const { CustomError } = require('../constants/error.respone');
const { NOT_FOUND } = require('../constants/httpStatusCode');
const profileFieldModel = require('../models/profileField.model');

class ProfileFieldService {
    static getAllProfileFields = async ({ unSelect = { __v: 0 } } = {}) => {
        const profileFields = await profileFieldModel
            .find({})
            .select(unSelect)
            .populate({
                path: 'profileField_icon',
                select: ['icon_url', '-_id'],
            });

        if (!profileFields) {
            throw new CustomError('Can not get profile fields', NOT_FOUND);
        }

        return profileFields;
    };
}

module.exports = ProfileFieldService;
