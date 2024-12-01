import { Request, Response } from 'express';
import Team from '../../../models/league/teamModel';
import League from '../../../models/league/leagueModel';
import User from '../../../models/userModel';

export const getTeamById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { teamId } = req.params;

    if (isNaN(Number(teamId))) {
      return res.status(400).json({ message: 'Invalid team ID. It must be a number.' });
    }

    const team = await Team.findByPk(teamId, {
      include: [
        { model: League, as: 'league' },
        { model: User, as: 'user' },
      ],
    });

    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
