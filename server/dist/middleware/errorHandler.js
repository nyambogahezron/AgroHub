"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = require("../errors/custom-api");
const errorHandlerMiddleware = (err, req, res, next) => {
    // Default error
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    if (err instanceof custom_api_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors || {})
            .map((item) => item.message)
            .join(',');
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue || {})} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // Mongoose not found error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({
        msg: customError.msg,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.default = errorHandlerMiddleware;
