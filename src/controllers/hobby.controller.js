const { OK } = require('../constants/success.respone');
const HobbyService = require('../services/hobby.service');

class HobbyController {
    getAllHobbies = async (req, res) => {
        new OK({
            message: 'Get all hobbies successfully',
            metadata: await HobbyService.getAllHobbies(),
        }).send(res);
    };
}

module.exports = new HobbyController();
