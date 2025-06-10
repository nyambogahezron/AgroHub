"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const errors_1 = __importDefault(require("../errors"));
const utils_1 = require("../utils");
const Token_1 = __importDefault(require("../models/Token"));
const utils_2 = require("../utils");
const authenticateUser = async (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, utils_1.isTokenValid)(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = (0, utils_1.isTokenValid)(refreshToken);
        const existingToken = await Token_1.default.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        });
        if (!existingToken || !(existingToken === null || existingToken === void 0 ? void 0 : existingToken.isValid)) {
            throw new errors_1.default.UnauthenticatedError('Authentication Invalid');
        }
        (0, utils_2.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new errors_1.default.UnauthenticatedError('Authentication Invalid');
    }
};
exports.authenticateUser = authenticateUser;
