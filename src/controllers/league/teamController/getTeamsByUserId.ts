import { Request, Response } from 'express';
import Team from '../../../models/league/teamModel';
import League from '../../../models/league/leagueModel';

export const getTeamsByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid userId. It must be a number.' });
      return;
    }

    const teams = await Team.findAll({
      where: { userId },
      include: [
        { model: League, as: 'league', attributes: ['id', 'name'] },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (teams.length === 0) {
      res.status(404).json({ message: 'No teams found for the given userId.' });
      return;
    }

    res.status(200).json(teams);
  } catch (error: any) {
    console.error('Error fetching teams by userId:', error);
    res.status(500).json({ message: 'An error occurred while fetching teams.' });
  }
};
