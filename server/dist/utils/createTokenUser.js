"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user._id.toString(),
        role: user.role,
        email: user.email
    };
};
exports.default = createTokenUser;
