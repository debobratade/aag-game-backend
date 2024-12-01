import { Request, Response } from 'express';
import Match from "../../../models/league/matchModel";
import Joi from "joi";

// Validation schema for the result
const resultSchema = Joi.object({
    result: Joi.string()
        .valid("Team 1 Won", "Team 2 Won", "Draw")
        .required()
        .messages({
            "any.only": "Result must be one of 'Team 1 Won', 'Team 2 Won', or 'Draw'.",
            "string.base": "Result must be a string.",
            "any.required": "Result is required.",
        }),
});

// Update match result
export const updateMatchResult = async (req: Request, res: Response): Promise<any> => {
    try {
        const matchId = Number(req.params.matchId);
        if (isNaN(matchId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }

        // Validate input data
        const { error } = resultSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
        }

        // Check if the match exists
        const match = await Match.findByPk(matchId);
        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }

        // Update and save the result
        match.result = req.body.result;
        await match.save();

        res.status(200).json({ message: "Match result updated successfully", match });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
