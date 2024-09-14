const { AuthFailureError } = require('../constants/error.respone');
const admin = require('firebase-admin');

const authentication = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    // if (!token) {
    //     console.log('Authentication failed');
    //     throw new AuthFailureError();
    // }

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
        throw new AuthFailureError();
    }

    req.uid = decodedToken.uid;
    next();
};

module.exports = { authentication };
