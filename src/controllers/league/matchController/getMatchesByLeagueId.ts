import { Request, Response } from 'express';
import Match from "../../../models/league/matchModel";
import Team from "../../../models/league/teamModel";
import League from "../../../models/league/leagueModel";

// Get all matches in a league
export const getMatchesByLeagueId = async (req: Request, res: Response): Promise<any> => {
    try {
        const leagueId = Number(req.params.leagueId);
        if (isNaN(leagueId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }
        const matches = await Match.findAll({
            where: { leagueId: leagueId },
            include: [
                { model: Team, as: "team1" }, 
                { model: Team, as: "team2" }, 
                { model: League, as: "league" }, 
            ],
        });
        res.status(200).json(matches);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


