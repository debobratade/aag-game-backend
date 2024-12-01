import { Request, Response } from "express";
import Subscription from "../../models/subscriptionModel";
import { subscriptionSchemaToCreate } from "../../validators/subscriptionsValidator";

// add a new subscription plan
export const addSubscription = async (req: Request, res: Response): Promise<any> => {
  try {
 
    const { error } = subscriptionSchemaToCreate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, features, price } = req.body;

    const existingSubscription = await Subscription.findOne({ where: { name } });
    if (existingSubscription) {
      return res.status(400).json({ message: "A subscription plan with this name already exists." });
    }

    const newSubscription = await Subscription.create({ name, features, price });

    return res.status(201).json({
      message: "Subscription plan added successfully!",
      subscription: newSubscription,
    });
  } catch (error: any) {
    console.error("Error adding subscription plan:", error.message || error);
    return res.status(500).json({
      message: "An error occurred while adding the subscription plan.",
    });
  }
};
