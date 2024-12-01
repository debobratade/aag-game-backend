import { Request, Response } from 'express';
import League from "../../../models/league/leagueModel";
import MatchModel from "../../../models/league/matchModel";
import Team from '../../../models/league/teamModel';


// Delete league
export const deleteLeague = async (req: Request, res: Response):Promise<any> => {
  try {
    // Find the league by ID
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    // Delete associated matches and teams
    await MatchModel.destroy({ where: { leagueId: req.params.id } });
    await Team.destroy({ where: { leagueId: req.params.id } });

    // Delete the league
    await league.destroy();
    
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
