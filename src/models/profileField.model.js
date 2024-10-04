const { Schema, default: mongoose } = require('mongoose');

const DOCUMENT_NAME = 'ProfileField';
const COLLECTION_NAME = 'ProfileFields';

const Icon = require('./icon.model');

const profileFieldSchema = new Schema(
    {
        profileField_title: {
            type: String,
            required: true,
        },
        profileField_placeholder: {
            type: String,
            required: true,
        },
        profileField_description: {
            type: String,
            required: true,
        },
        profileField_icon: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Icon',
        },
        profileField_limit: {
            type: Number,
            default: 100,
            min: 0,
            max: 1000,
        },
    },
    {
        collection: COLLECTION_NAME,
    },
);

module.exports = mongoose.model(DOCUMENT_NAME, profileFieldSchema);
