import { Request, Response } from 'express';
import Match from "../../../models/league/matchModel";
import Team from "../../../models/league/teamModel";
import League from "../../../models/league/leagueModel";

// Get match by ID
export const getMatchById = async (req: Request, res: Response): Promise<any> => {
    try {
        const matchId = Number(req.params.matchId);
        if (isNaN(matchId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }

        // Fetch match with related data
        const match = await Match.findByPk(matchId, {
            include: [
                { model: Team, as: "team1" }, 
                { model: Team, as: "team2" },
                { model: League, as: "league" }, 
            ],
        });

        if (match) {
            res.status(200).json(match);
        } else {
            res.status(404).json({ message: 'Match not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
