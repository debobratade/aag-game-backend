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
exports.addSubscription = void 0;
const subscriptionModel_1 = __importDefault(require("../../models/subscriptionModel"));
const subscriptionsValidator_1 = require("../../validators/subscriptionsValidator");
// add a new subscription plan
const addSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = subscriptionsValidator_1.subscriptionSchemaToCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { name, features, price } = req.body;
        const existingSubscription = yield subscriptionModel_1.default.findOne({ where: { name } });
        if (existingSubscription) {
            return res.status(400).json({ message: "A subscription plan with this name already exists." });
        }
        const newSubscription = yield subscriptionModel_1.default.create({ name, features, price });
        return res.status(201).json({
            message: "Subscription plan added successfully!",
            subscription: newSubscription,
        });
    }
    catch (error) {
        console.error("Error adding subscription plan:", error.message || error);
        return res.status(500).json({
            message: "An error occurred while adding the subscription plan.",
        });
    }
});
exports.addSubscription = addSubscription;
