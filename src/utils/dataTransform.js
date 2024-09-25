const _ = require('lodash');

const getDataFields = ({ fields = [], data = {} }) => {
    return _.pick(data, fields);
};

const selectData = (select = []) => {
    return Object.fromEntries(select.map((field) => [field, 1]));
};

const unSelectData = (unSelect = []) => {
    return Object.fromEntries(unSelect.map((field) => [field, 0]));
};

module.exports = {
    getDataFields,
    selectData,
    unSelectData,
};
