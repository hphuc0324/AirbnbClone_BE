const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Icon';
const COLLECTION_NAME = 'Icons';

const iconSchema = Schema(
    {
        icon_url: {
            type: String,
            required: true,
        },
        icon_label: {
            type: String,
            required: true,
        },
    },
    {
        collection: COLLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, iconSchema);
