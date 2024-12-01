import { Router } from "express";
import { getSubscriptions } from "../controllers/subscriptionController/getSubscriptions";
import { selectSubscription } from "../controllers/subscriptionController/selectSubscription";
import { addSubscription } from "../controllers/subscriptionController/addSubscription";
import { validateJWT } from "../middleware/auth";


const router = Router();

router.get("/", validateJWT, getSubscriptions);
router.post("/select", validateJWT, selectSubscription);
router.post("/", addSubscription); // Admin api to add new subscription plan

export default router;
