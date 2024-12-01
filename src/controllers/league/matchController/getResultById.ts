import { Request, Response } from 'express';
import Match from "../../../models/league/matchModel";

// Get match result by matchId
export const getMatchResultById = async (req: Request, res: Response): Promise<any> => {
    try {
        const matchId = Number(req.params.matchId);
        if (isNaN(matchId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }

        const match = await Match.findByPk(matchId, {
            attributes: ['result'],
        });

        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }

        res.status(200).json({ result: match.result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
