const hobbyModel = require('../models/hobby.model');
const { CustomError } = require('../constants/error.respone');
const { NOT_FOUND } = require('../constants/httpStatusCode');

class HobbyService {
    static getAllHobbies = async ({ unSelect = { __v: 0 } } = {}) => {
        const hobbies = await hobbyModel
            .find({})
            .select({ ...unSelect })
            .populate({
                path: 'hobby_icon',
                select: ['icon_url', '-_id'],
            });

        if (!hobbies) {
            throw new CustomError('Cannot get hobbies', NOT_FOUND);
        }

        return hobbies;
    };
}

module.exports = HobbyService;
