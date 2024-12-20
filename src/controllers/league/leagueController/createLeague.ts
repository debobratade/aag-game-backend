import { Request, Response } from 'express';
import League from '../../../models/league/leagueModel';
import { validateCreateLeague } from '../../../validators/leagueValidator';

export const createLeague = async (req: Request, res: Response): Promise<any> => {
    const { error } = validateCreateLeague.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json({
            message: 'Validation error',
            details: errorMessage,
        });
    }

    try {
        const { name, start_time } = req.body;
        const existingLeague = await League.findOne({
            where: { name },
            order: [['end_time', 'DESC']],
        });

        if (existingLeague) {
            const existingEndDate = new Date(existingLeague.end_time);
            const newStartDate = new Date(start_time);

            if (newStartDate <= existingEndDate) {
                return res.status(400).json({
                    message: `A league named ${name} is already scheduled from ${existingLeague.start_time} to ${existingLeague.end_time}.`,
                });
            }
        }

        const league = await League.create(req.body);
        res.status(201).json(league);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
