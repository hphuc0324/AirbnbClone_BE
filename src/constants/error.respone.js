const httpStatusCodes = require('./httpStatusCode');
const statusDescription = require('./statusDescription');

class CustomError extends Error {
    constructor(description, statusCode) {
        super(description);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, CustomError);
    }
}

class InternalServerError extends CustomError {
    constructor(
        description = statusDescription.INTERNAL_SERVER_ERROR,
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
    ) {
        super(description, statusCode);
    }
}

class ForbiddenRequest extends CustomError {
    constructor(description = statusDescription.FORBIDDEN, statusCode = httpStatusCodes.FORBIDDEN) {
        super(description, statusCode);
    }
}

class Api404Error extends CustomError {
    constructor(description = statusDescription.NOT_FOUND, statusCode = httpStatusCodes.NOT_FOUND) {
        super(description, statusCode);
    }
}

class BadRequest extends CustomError {
    constructor(description = statusDescription.BAD_REQUEST, statusCode = httpStatusCodes.BAD_REQUEST) {
        super(description, statusCode);
    }
}

class ConflictRequest extends CustomError {
    constructor(description = statusDescription.CONFLICT, statusCode = httpStatusCodes.CONFLICT) {
        super(description, statusCode);
    }
}

class AuthFailureError extends CustomError {
    constructor(description = statusDescription.UNAUTHORIZED, statusCode = httpStatusCodes.UNAUTHORIZED) {
        super(description, statusCode);
    }
}

module.exports = {
    CustomError,
    InternalServerError,
    ForbiddenRequest,
    Api404Error,
    BadRequest,
    ConflictRequest,
    AuthFailureError,
};
