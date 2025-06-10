"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgets = exports.getTransactions = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Budget_1 = __importDefault(require("../models/Budget"));
// Functions to get data for reports
const getUsers = async () => {
    try {
        return await User_1.default.find({});
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
exports.getUsers = getUsers;
const getTransactions = async () => {
    try {
        return await Transaction_1.default.find({});
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};
exports.getTransactions = getTransactions;
const getBudgets = async () => {
    try {
        return await Budget_1.default.find({});
    }
    catch (error) {
        console.error("Error fetching budgets:", error);
        return [];
    }
};
exports.getBudgets = getBudgets;
