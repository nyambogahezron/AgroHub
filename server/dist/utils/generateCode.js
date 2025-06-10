"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const generateCode = () => {
    const randomBytes = crypto_1.default.randomBytes(3);
    const sixDigitCode = parseInt(randomBytes.toString("hex"), 16) % 1000000;
    return sixDigitCode.toString().padStart(6, "0");
};
exports.default = generateCode;
