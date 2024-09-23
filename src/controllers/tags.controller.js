const { OK } = require('../constants/success.respone');
const { unSelectData } = require('../utils/dataTransform');
const TagsService = require('../services/tags.service');

class TagController {
    getAllTags = async (req, res) => {
        const unSelect = unSelectData(['__v']);

        new OK({
            message: 'Get all tags successfully',
            metadata: await TagsService.getAllTags({ unSelect }),
        }).send(res);
    };
}

module.exports = new TagController();
