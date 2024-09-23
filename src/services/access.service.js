const userModel = require('../models/user.model');
const { InternalServerError, ConflictRequest } = require('../constants/error.respone');
const { getDataFields } = require('../utils/dataTransform');

const getUserFields = (data) => {
    const user = getDataFields({
        fields: ['user_uid', 'user_name', 'user_email', 'user_avatar', 'user_role'],
        data: data,
    });

    return user;
};

class AccessService {
    static signIn = async (user) => {
        const { uid, name, email } = user;

        const foundUser = await userModel.findOne({ user_uid: uid }).lean();
        if (!foundUser) {
            const newUser = await userModel.create({
                user_uid: uid,
                user_name: name,
                user_email: email,
            });

            if (!newUser) {
                throw new InternalServerError();
            }

            return getUserFields(newUser);
        }

        return getUserFields(foundUser);
    };

    static signUp = async (user, name) => {
        const { uid, email } = user;

        const foundUser = await userModel.findOne({ user_uid: uid }).lean();

        if (foundUser) {
            throw new ConflictRequest();
        }

        const newUser = await userModel.create({
            user_uid: uid,
            user_name: name,
            user_email: email,
        });

        if (!newUser) {
            throw new InternalServerError();
        }

        return getUserFields(newUser);
    };
}

module.exports = AccessService;
