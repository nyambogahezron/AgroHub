"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.logout = exports.login = exports.register = void 0;
const CustomError = __importStar(require("../errors"));
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const Subscription_1 = __importDefault(require("../models/Subscription"));
const http_status_codes_1 = require("http-status-codes");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("../utils");
// @ Register User
// @ endpoint /api/v1/auth/register
// @ method POST
const register = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, name, password } = req.body;
    //check if email already exists
    const emailAlreadyExists = await User_1.default.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists !');
    }
    const verificationToken = (0, utils_1.generateCode)();
    const user = await User_1.default.create({
        name,
        email,
        password,
        verificationToken,
    });
    await (0, utils_1.sendVerificationEmail)({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
    });
    // @ts-ignore - Intentionally set password to null for security
    user.password = null;
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'User Created Success, Please check Email to verify',
        user: user,
    });
});
exports.register = register;
// @ Verify Email
// @ endpoint /api/v1/auth/verify-email
// @ method POST
const verifyEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const { verificationToken, email } = req.body;
    if (!verificationToken || !email) {
        throw new CustomError.BadRequestError('Provide all fields');
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }
    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }
    user.isVerified = true;
    user.verified = new Date();
    user.verificationToken = '';
    await user.save();
    user.password = undefined;
    // create a subscription for the user
    const subscription = await Subscription_1.default.create({
        user: user._id,
        plan: 'free',
        status: 'active',
        start_date: new Date(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: 'Email Verified Successful', user: user });
});
exports.verifyEmail = verifyEmail;
// @ Login
// @ endpoint /api/v1/auth/login
// @ method POST
const login = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    if (!user.isVerified) {
        throw new CustomError.UnauthenticatedError('Please verify your email');
    }
    const tokenUser = (0, utils_1.createTokenUser)(user);
    let refreshToken = '';
    // check for existing token
    const existingToken = await Token_1.default.findOne({ user: user._id });
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        (0, utils_1.attachCookiesToResponse)({ res, user: tokenUser, refreshToken });
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
        return;
    }
    refreshToken = crypto_1.default.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };
    await Token_1.default.create(userToken);
    (0, utils_1.attachCookiesToResponse)({ res, user: tokenUser, refreshToken });
    // get use subscription
    const subscription = await Subscription_1.default.findOne({ user: user._id });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ user: tokenUser, subscription: subscription });
});
exports.login = login;
// @ Logout
// @ endpoint /api/v1/auth/logout
// @ method DELETE
const logout = (0, asyncHandler_1.default)(async (req, res) => {
    const { userId } = req.body;
    await Token_1.default.findOneAndDelete({ user: userId });
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user logged out!', user: userId });
});
exports.logout = logout;
// @ Forgot Password
// @ endpoint /api/v1/auth/forgot-password
// @ method POST
const forgotPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }
    const user = await User_1.default.findOne({ email });
    if (user) {
        const passwordToken = (0, utils_1.generateCode)();
        // send email
        await (0, utils_1.sendResetPasswordEmail)({
            name: user.name,
            email: user.email,
            token: passwordToken,
        });
        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
        user.passwordToken = (0, utils_1.createHash)(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }
    else {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password code' });
});
exports.forgotPassword = forgotPassword;
// @ Reset Password
// @ endpoint /api/v1/auth/reset-password
// @ method POST
const resetPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const { token, email, password } = req.body;
    if (!token || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User_1.default.findOne({ email });
    if (user) {
        const currentDate = new Date();
        if (user.passwordToken === (0, utils_1.createHash)(token) &&
            user.passwordTokenExpirationDate &&
            user.passwordTokenExpirationDate > currentDate) {
            user.password = password;
            user.passwordToken = undefined;
            user.passwordTokenExpirationDate = undefined;
            await user.save();
        }
        else {
            throw new CustomError.BadRequestError('Something went wrong Please try again');
        }
    }
    else {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'password reset Successful' });
});
exports.resetPassword = resetPassword;
