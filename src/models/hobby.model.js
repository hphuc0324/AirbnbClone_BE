const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Hobby';
const COLLECTION_NAME = 'Hobbies';

const hobbySchema = new Schema(
    {
        hobby_name: {
            type: String,
            required: true,
        },
        hobby_icon: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Icon',
        },
    },
    {
        collection: COLLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, hobbySchema);
