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
const ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide item name'],
        minlength: [3, 'Item name too short'],
        maxlength: [50, 'Item name too long'],
    },
    amount: {
        type: Number,
        required: [true, 'Please provide item amount'],
        min: [0, 'Amount cannot be negative'],
    },
});
const BudgetSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'Please provide Organization'],
    },
    title: {
        type: String,
        required: [true, 'Please provide Title'],
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
        default: '',
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
}, { timestamps: true });
// calculate total amount
BudgetSchema.methods.calculateTotalAmount = function () {
    let total = 0;
    this.items.forEach((item) => {
        total += item.amount;
    });
    this.amount = total;
    return total;
};
BudgetSchema.pre('save', function (next) {
    this.calculateTotalAmount();
    next();
});
BudgetSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.items) {
        let total = 0;
        update.items.forEach((item) => {
            total += item.amount;
        });
        update.amount = total;
    }
    next();
});
exports.default = mongoose_1.default.model('Budget', BudgetSchema);
