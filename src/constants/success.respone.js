const httpStatusCodes = require('./httpStatusCode');
const statusDescription = require('./statusDescription');

class SuccessRespone {
    constructor({ message, statusCode = httpStatusCodes.OK, reasonStatusCode = statusDescription.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessRespone {
    constructor({
        options = {},
        message,
        metadata,
        statusCode = httpStatusCodes.CREATED,
        reasonStatusCode = statusDescription.CREATED,
    }) {
        super({ message, metadata, statusCode, reasonStatusCode });
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessRespone,
};
