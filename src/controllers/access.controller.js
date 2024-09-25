const { OK, CREATED } = require('../constants/success.respone');
const AccessService = require('../services/access.service');
const { AuthFailureError } = require('../constants/error.respone');

class AccessController {
    signIn = async (req, res) => {
        const user = req.user;

        if (!user.uid) {
            throw new AuthFailureError();
        }

        new OK({ message: 'Login successfully', metadata: await AccessService.signIn(user) }).send(res);
    };

    signUp = async (req, res) => {
        const { name } = req.body;
        const user = req.user;

        if (!user.uid) {
            throw new AuthFailureError();
        }

        new CREATED({ message: 'Sign up successfully', metadata: await AccessService.signUp(user, name) }).send(res);
    };
}

module.exports = new AccessController();
