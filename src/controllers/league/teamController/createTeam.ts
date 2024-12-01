import { Request, Response } from 'express';
import { validateCreateTeam } from '../../../validators/teamValidator';
import League from '../../../models/league/leagueModel';
import User from '../../../models/userModel';
import Team from '../../../models/league/teamModel';


export const createTeam = async (req: Request, res: Response): Promise<any> => {
    const { error } = validateCreateTeam.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((d) => d.message.replace(/"/g, '')).join(', '),
        });
    }

    try {
        const league = await League.findByPk(req.params.leagueId);
        const user = await User.findByPk(req.body.userId);

        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const team = await Team.create({
            name: req.body.name,
            leagueId: req.params.leagueId,
            userId: req.body.userId,
        });

        return res.status(201).json(team);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
