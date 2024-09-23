const { Schema, default: mongoose, model } = require('mongoose');
const Icon = require('./icon.model');

const DOCUMENT_NAME = 'Tag';
const COLLECTION_NAME = 'Tags';

const tagSchema = new Schema(
    {
        tag_label: {
            type: String,
            required: true,
        },
        tag_icon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Icon',
        },
    },
    {
        collection: COLLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, tagSchema);
