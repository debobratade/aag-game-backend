import { Request, Response } from "express";
import Subscription from "../../models/subscriptionModel";

export const getSubscriptions = async (req: Request, res: Response): Promise<any> => {
  try {
    const subscriptions = await Subscription.findAll();
    return res.status(200).json(subscriptions);
  } catch (error: any) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ message: "An error occurred while fetching subscriptions." });
  }
};


