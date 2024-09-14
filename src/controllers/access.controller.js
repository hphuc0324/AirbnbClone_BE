const { OK } = require('../constants/success.respone');
const AccessService = require('../services/access.service');
const { AuthFailureError } = require('../constants/error.respone');

class AccessController {
    login = async (req, res) => {
        const { uid } = req.user;

        if (!uid) {
            throw new AuthFailureError();
        }

        new OK({ message: 'Login successfully', metadata: await AccessService.login(uid) });
    };
}

module.exports = new AccessController();
