const _ = require('lodash');

const getDataFields = ({ fields = [], data = {} }) => {
    return _.pick(data, fields);
};

module.exports = {
    getDataFields,
};
