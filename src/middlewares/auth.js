const { AuthFailureError } = require('../constants/error.respone');

const authentication = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        console.log('Authentication failed');
        throw new AuthFailureError();
    }
};

module.exports = { authentication };
