const iconModel = require('../models/icon.model');
const tagModel = require('../models/tag.model');
const hobbyModel = require('../models/hobby.model');
const profileFieldModel = require('../models/profileField.model');

const dataField = {
    'icon.json': {
        main_field: 'icon_label',
        data_model: iconModel,
    },
    'tag.json': {
        main_field: 'tag_label',
        data_model: tagModel,
    },
    'hobby.json': {
        main_field: 'hobby_name',
        data_model: hobbyModel,
    },
    'profileField.json': {
        main_field: 'profileField_title',
        data_model: profileFieldModel, // Placeholder for future use
    },
};

module.exports = dataField;
