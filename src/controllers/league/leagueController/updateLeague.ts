import { Request, Response } from 'express';
import League from "../../../models/league/leagueModel";
import { validateCreateLeague } from '../../../validators/leagueValidator'; // Assuming this is your Joi validation
import { Op } from 'sequelize';

export const updateLeague = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = validateCreateLeague.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
      });
    }

    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    const { name, start_time, end_time } = req.body;
    const existingLeague = await League.findOne({
      where: {
        name,
        end_time: { [Op.gte]: start_time }, 
      },
    });

    if (existingLeague) {
      return res.status(400).json({
        message: `A league with the same name already exists from ${existingLeague.start_time} to ${existingLeague.end_time}.`,
      });
    }

    await league.update(req.body);
    return res.status(200).json(league);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


