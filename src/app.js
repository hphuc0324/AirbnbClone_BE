const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { Api404Error } = require('./constants/error.respone');
const { INTERNAL_SERVER_ERROR } = require('./constants/httpStatusCode');
const { INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_DES } = require('./constants/statusDescription');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./dbs/init.mongodb');

app.use('/', require('./routers'));

app.use((req, res, next) => {
    next(new Api404Error());
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
        message: error.message || INTERNAL_SERVER_ERROR_DES,
        code: statusCode,
    });
});

module.exports = app;
