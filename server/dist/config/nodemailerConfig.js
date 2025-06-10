"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailerConfig = {
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.pass,
    },
};
exports.default = nodemailerConfig;
