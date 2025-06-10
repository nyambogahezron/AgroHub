"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.delete('/logout', authController_1.logout);
router.post('/verify-email', authController_1.verifyEmail);
router.post('/reset-password', authController_1.resetPassword);
router.post('/forgot-password', authController_1.forgotPassword);
exports.default = router;
