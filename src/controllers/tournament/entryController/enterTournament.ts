import { Request, Response } from 'express';
import { validateEntryInputs } from '../../../validators/entryValidators';
import Tournament from '../../../models/tournament/tournamentModel';
import User from '../../../models/userModel';
import Entry from '../../../models/tournament/entryModel';


// Enter a user into a tournament
export const enterTournament = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tournamentId } = req.params;
        const { userId } = req.body;

        const { error } = validateEntryInputs(tournamentId, userId);

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                details: error.details.map((detail: any) => detail.message.replace(/"/g, '')).join(', '),
            });
        }

        const tournament = await Tournament.findByPk(tournamentId);
        const user = await User.findByPk(userId);

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already entered into the tournament
        const existingEntry = await Entry.findOne({ where: { tournament_id: tournamentId, user_id: userId } });
        if (existingEntry) {
            return res.status(400).json({ message: 'User is already entered in this tournament' });
        }

        const entry = await Entry.create({
            tournament_id: tournamentId,
            user_id: userId,
            status: 'Pending', // Entry is initially pending
        });

        return res.status(201).json(entry);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
