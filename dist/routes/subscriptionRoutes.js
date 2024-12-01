"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getSubscriptions_1 = require("../controllers/subscriptionController/getSubscriptions");
const selectSubscription_1 = require("../controllers/subscriptionController/selectSubscription");
const addSubscription_1 = require("../controllers/subscriptionController/addSubscription");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.validateJWT, getSubscriptions_1.getSubscriptions);
router.post("/select", auth_1.validateJWT, selectSubscription_1.selectSubscription);
router.post("/", addSubscription_1.addSubscription); // Admin api to add new subscription plan
exports.default = router;
