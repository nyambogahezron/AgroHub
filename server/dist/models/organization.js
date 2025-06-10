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
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const User_1 = __importDefault(require("./User"));
const errors_1 = __importDefault(require("../errors"));
// Update the Organization interface in models.ts
const OrganizationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    name: {
        type: String,
        required: [true, 'Please provide Name'],
        minlength: [3, 'Name too short'],
        maxlength: [50, 'Name too long'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator_1.default.isEmail,
            message: 'Please provide valid email',
        },
    },
    logo: {
        type: String,
        default: '/images/org-default.jpg',
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number'],
        minlength: [10, 'Phone number too short'],
        maxlength: [15, 'Phone number too long'],
    },
    address: {
        type: String,
        required: [true, 'Please provide address'],
    },
}, { timestamps: true });
// Pre-save hook to validate user reference
OrganizationSchema.pre('save', async function (next) {
    try {
        const user = await User_1.default.findById(this.user);
        if (!user) {
            throw new errors_1.default.BadRequestError('Invalid user ref');
        }
        next();
    }
    catch (error) {
        next(error instanceof Error ? error : new Error('Unknown error'));
    }
});
exports.default = mongoose_1.default.model('Organization', OrganizationSchema);
