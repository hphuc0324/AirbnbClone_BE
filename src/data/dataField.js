const iconModel = require('../models/icon.model');
const tagModel = require('../models/tag.model');

const dataField = {
    'icon.json': {
        main_field: 'icon_label',
        data_model: iconModel,
    },
    'tag.json': {
        main_field: 'tag_label',
        data_model: tagModel,
    },
};

module.exports = dataField;
