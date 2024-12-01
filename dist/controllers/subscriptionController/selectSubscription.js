"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSubscription = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const subscriptionModel_1 = __importDefault(require("../../models/subscriptionModel"));
const subscriptionsValidator_1 = require("../../validators/subscriptionsValidator");
const selectSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = subscriptionsValidator_1.subscriptionSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { userId, subscriptionId } = value;
        const subscription = yield subscriptionModel_1.default.findByPk(subscriptionId);
        if (!subscription) {
            res.status(404).json({ message: "Subscription not found." });
            return;
        }
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        user.subscriptionId = subscriptionId;
        yield user.save();
        res.status(200).json({ message: "Subscription selected successfully!" });
    }
    catch (error) {
        console.error("Error selecting subscription:", error.message || error);
        res.status(500).json({
            message: "An error occurred while selecting the subscription.",
        });
    }
});
exports.selectSubscription = selectSubscription;
