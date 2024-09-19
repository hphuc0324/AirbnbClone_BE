const { OK } = require('../constants/success.respone');
const AccessService = require('../services/access.service');
const { AuthFailureError } = require('../constants/error.respone');

class AccessController {
    login = async (req, res) => {
        const user = req.user;

        if (!user.uid) {
            throw new AuthFailureError();
        }

        new OK({ message: 'Login successfully', metadata: await AccessService.login(user) }).send(res);
    };

    signUp = async (req, res) => {
        const { name } = req.body;
        const user = req.user;

        if (!user.uid) {
            throw new AuthFailureError();
        }

        new OK({ message: 'Sign up successfully', metadata: await AccessService.signUp(user, name) }).send(res);
    };
}

module.exports = new AccessController();
