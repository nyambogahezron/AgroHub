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
const errors_1 = __importDefault(require("../errors"));
const EmailAlert_1 = __importDefault(require("../utils/EmailAlert"));
const transactionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    budget: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Budget',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['sales', 'expense'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    transaction_date: {
        type: Date,
        required: true,
    },
    receipt: {
        type: String,
        default: 'default-receipt.jpg',
    },
}, {
    timestamps: true,
});
// check if the transaction exceed the budget
transactionSchema.pre('save', async function (next) {
    try {
        const budget = await mongoose_1.default.model('Budget').findById(this.budget);
        if (!budget) {
            throw new errors_1.default.NotFoundError('Budget not found');
        }
        if (this.category === 'expense' && this.amount > budget.amount) {
            const user = await mongoose_1.default
                .model('User')
                .findById(budget.user || this.user);
            if (user) {
                await (0, EmailAlert_1.default)({
                    email: user.email,
                    message: `You have exceeded the budget for '${this.title}' Budget
          the amount spent is ${this.amount} and the budget is ${budget.amount}
          Please take note of this and adjust.
          To review the budget, click .`,
                    title: `Budget Exceeded`,
                    subject: `Budget Exceeded`,
                    action: process.env.clientLink || '',
                    name: budget.user.name,
                });
                // create a notification
                await mongoose_1.default.model('Notification').create({
                    user: budget.user._id,
                    message: `You have exceeded the budget for ${this.title}
          the amount spent is ${this.amount} and the budget is ${budget.amount}
          Please take note of this and adjust.`,
                });
            }
        }
        next();
    }
    catch (error) {
        next(error instanceof Error ? error : new Error('Unknown error'));
    }
});
const Transaction = mongoose_1.default.model('Transaction', transactionSchema);
exports.default = Transaction;
