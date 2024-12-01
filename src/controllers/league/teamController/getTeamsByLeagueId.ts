import { Request, Response } from 'express';
import Team from '../../../models/league/teamModel';
import League from '../../../models/league/leagueModel';
import User from '../../../models/userModel';

export const getTeamsByLeagueId = async (req: Request, res: Response): Promise<void> => {
  try {
    const leagueId = parseInt(req.params.leagueId, 10);
    if (isNaN(leagueId)) {
      res.status(400).json({ message: 'Invalid leagueId. It must be a number.' });
      return;
    }

    const teams = await Team.findAll({
      where: { leagueId },
      include: [
        { model: League, as: 'league', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['userId', 'username', 'email'] }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (teams.length === 0) {
      res.status(404).json({ message: 'No teams found for the given leagueId.' });
      return;
    }

    res.status(200).json(teams);
  } catch (error: any) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'An error occurred while fetching teams.' });
  }
};
