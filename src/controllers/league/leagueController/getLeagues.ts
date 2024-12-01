import { Request, Response } from 'express';
import League from '../../../models/league/leagueModel';
import { validateGetLeaguesQuery } from '../../../validators/leagueValidator';


export const getLeagues = async (req: Request, res: Response): Promise<any> => {
  // Validate query parameters
  const { error } = validateGetLeaguesQuery.validate(req.query);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((d) => d.message).join(', '),
    });
  }

  const {
    page = 1,
    limit = 10,
    name,
    sortBy = 'start_time',
    order = 'ASC',
  } = req.query;

  try {
    const leagues = await League.findAll({
      where: name ? { name } : undefined,  // Apply filtering based on name if provided
      order: [[sortBy as string, order as string]],  // Apply sorting on starting date
      offset: (parseInt(page as string) - 1) * parseInt(limit as string),  // Pagination offset
      limit: parseInt(limit as string),  // Pagination limit
    });

    return res.status(200).json(leagues);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
