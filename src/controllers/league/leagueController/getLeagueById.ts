import { Request, Response } from 'express';
import League from '../../../models/league/leagueModel';
import Team from '../../../models/league/teamModel';

export const getLeagueById = async (req: Request, res: Response): Promise<void> => {
  try {
    const leagueId = parseInt(req.params.id, 10);

    // Validate the league ID parameter
    if (isNaN(leagueId)) {
      res.status(400).json({ message: 'Invalid league ID. It must be a number.' });
      return;
    }

    // Fetch the league with optional eager loading of associated teams
    const league = await League.findByPk(leagueId, {
      include: [
        {
          model: Team,
          as: 'teams',
        },
      ],
      // Exclude unnecessary fields
      attributes: { exclude: ['createdAt', 'updatedAt'] }, 
    });

    if (!league) {
      res.status(404).json({ message: 'League not found.' });
      return;
    }

    res.status(200).json(league);
  } catch (error: any) {
    console.error('Error fetching league by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the league.' });
  }
};
