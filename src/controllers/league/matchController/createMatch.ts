import { Request, Response } from 'express';
import League from '../../../models/league/leagueModel';
import Team from '../../../models/league/teamModel';
import Match from '../../../models/league/matchModel';
import { validateCreateMatch } from '../../../validators/leagueMatchValidator';
import { Op } from 'sequelize';

export const createMatch = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = validateCreateMatch.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail: any) => detail.message.replace(/"/g, '')).join(', '),
      });
    }

    const league = await League.findByPk(req.params.leagueId);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    const [team1, team2] = await Promise.all([
      Team.findByPk(req.body.team1Id),
      Team.findByPk(req.body.team2Id),
    ]);
    if (!team1 || !team2) {
      return res.status(404).json({ message: 'One or both teams not found' });
    }

    if (
      req.body.start_time < league.start_time ||
      req.body.end_time > league.end_time ||
      req.body.start_time >= req.body.end_time
    ) {
      return res.status(400).json({
        message: `Match times must be within the league's start (${league.start_time}) and end (${league.end_time}) dates, and the start time must precede the end time.`,
      });
    }

    const overlappingMatch = await Match.findOne({
      where: {
        leagueId: req.params.leagueId,
        // Existing match starts before the new match ends
        start_time: { [Op.lt]: req.body.end_time }, 
        // Existing match ends after the new match starts
        end_time: { [Op.gt]: req.body.start_time }, 
        [Op.or]: [
          { team1Id: req.body.team1Id, team2Id: req.body.team2Id },
          { team1Id: req.body.team2Id, team2Id: req.body.team1Id }, 
        ],
      },
    });

    if (overlappingMatch) {
      return res.status(400).json({
        message: `A match between the same teams already exists in the time frame (${overlappingMatch.start_time} - ${overlappingMatch.end_time}).`,
      });
    }

    const match = await Match.create({
      leagueId: req.params.leagueId,
      team1Id: req.body.team1Id,
      team2Id: req.body.team2Id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      result: req.body.result,
    });

    res.status(201).json(match);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
