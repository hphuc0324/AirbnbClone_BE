const { InternalServerError } = require('../constants/error.respone');
const tagModel = require('../models/tag.model');

class TagsService {
    static getAllTags = async ({ unSelect }) => {
        const tags = await tagModel
            .find({})
            .select({ ...unSelect })
            .populate({
                path: 'tag_icon',
                select: ['icon_url'],
            })
            .lean()
            .exec();

        if (!tags) {
            throw new InternalServerError();
        }

        return tags;
    };
}

module.exports = TagsService;
