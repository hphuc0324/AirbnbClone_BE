const { Schema, model } = require('mongoose');

const Hobby = require('./hobby.model');
const ProfileField = require('./profileField.model');

const COLLECTION_NAME = 'User';
const DOCUMENT_NAME = 'User';

const userSchema = new Schema(
    {
        user_uid: {
            type: String,
            required: true,
            unique: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
        },
        user_phoneNumber: {
            type: String,
        },
        user_avatar: {
            type: String,
            default: '',
        },
        user_address: {},
        user_description: {
            type: String,
        },
        user_profileField: [
            {
                field: {
                    type: Schema.ObjectId,
                    ref: 'ProfileField',
                },
                value: {
                    type: String,
                },
                _id: false,
            },
        ],
        user_hobbies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Hobby',
            },
        ],
        user_role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        collection: COLLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, userSchema);
