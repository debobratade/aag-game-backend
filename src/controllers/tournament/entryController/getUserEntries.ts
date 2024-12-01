import { Request, Response } from 'express';
import User from '../../../models/userModel';
import Entry from '../../../models/tournament/entryModel';
import Tournament from '../../../models/tournament/tournamentModel';


export const getUserEntries = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const entries = await Entry.findAll({
            where: { user_id: userId },
            include: [{
                model: Tournament,
                as: 'tournament', 
                attributes: ['id', 'name', 'start_time', 'end_time'] 
            }],
        });

        if (entries.length === 0) {
            return res.status(200).json({ message: 'No entries found for this user' });
        }

        return res.status(200).json(entries);
    } catch (error: any) {
        console.error("Error fetching user entries:", error);
        return res.status(500).json({ message: 'An error occurred while fetching the user entries.' });
    }
};
