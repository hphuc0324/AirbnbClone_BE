const { AuthFailureError, ForbiddenRequest } = require('../constants/error.respone');
const admin = require('../configs/config.firebase');

const authentication = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        throw new AuthFailureError();
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
        throw new ForbiddenRequest();
    }

    req.user = decodedToken;
    next();
};

module.exports = { authentication };
