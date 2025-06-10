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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const subscriptionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free',
    },
    price: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'trial', 'past_due', 'canceled'],
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    stripe_id: {
        type: String,
        default: null,
    },
    payPal_id: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
subscriptionSchema.methods.Pricing = function () {
    const plan = this.plan;
    let price = 0;
    if (plan === 'free') {
        price = 0;
    }
    else if (plan === 'basic') {
        price = 10;
    }
    else if (plan === 'premium') {
        price = 22;
    }
    this.price = price;
    return price;
};
subscriptionSchema.pre('save', async function (next) {
    try {
        this.Pricing();
        next();
    }
    catch (error) {
        next(error instanceof Error ? error : new Error('Unknown error'));
    }
});
exports.default = mongoose_1.default.model('Subscription', subscriptionSchema);
