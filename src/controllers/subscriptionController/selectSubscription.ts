import { Request, Response } from "express";
import User from "../../models/userModel";
import Subscription from "../../models/subscriptionModel";
import { subscriptionSchema } from "../../validators/subscriptionsValidator";



export const selectSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = subscriptionSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { userId, subscriptionId } = value;
    const subscription = await Subscription.findByPk(subscriptionId);
    if (!subscription) {
      res.status(404).json({ message: "Subscription not found." });
      return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    
    user.subscriptionId = subscriptionId;
    await user.save();

    res.status(200).json({ message: "Subscription selected successfully!" });
  } catch (error: any) {
    console.error("Error selecting subscription:", error.message || error);
    res.status(500).json({
      message: "An error occurred while selecting the subscription.",
    });
  }
};
