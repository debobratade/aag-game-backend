import { Request, Response } from 'express';
import Joi from 'joi';
import { Transaction } from 'sequelize';
import sequelize from '../../../database/database';
import Entry from '../../../models/tournament/entryModel';
import MatchForTournament from '../../../models/tournament/matchForTournamentModel';



// Joi validation schema for the request body
const matchmakeValidationSchema = Joi.object({
    tournamentId: Joi.number().integer().positive().required().messages({
        'number.base': 'Tournament ID must be a number.',
        'number.integer': 'Tournament ID must be an integer.',
        'number.positive': 'Tournament ID must be positive.',
        'any.required': 'Tournament ID is required.',
    }),
});

// Matchmake for a tournament
export const matchmake = async (req: Request, res: Response): Promise<any> => {
    const { error } = matchmakeValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { tournamentId } = req.body;

    // Start a transaction
    const transaction: Transaction = await sequelize.transaction();

    try {
        // Retrieve all pending entries for the tournament
        const pendingEntries = await Entry.findAll({
            where: { tournament_id: tournamentId, status: 'pending' },
            transaction,
        });

        if (pendingEntries.length < 2) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Not enough participants to matchmake.' });
        }

        // Group entries into pairs and create matches
        const matchesData = [];
        const updatedEntries: any = [];

        for (let i = 0; i < pendingEntries.length; i += 2) {
            if (i + 1 < pendingEntries.length) {
                const team1 = pendingEntries[i];
                const team2 = pendingEntries[i + 1];

                // Prepare match data for bulk creation
                matchesData.push({
                    tournament_id: tournamentId,
                    team1_id: team1.id,
                    team2_id: team2.id,
                    start_time: new Date(),
                    status: 'Matched',
                });

                // Update entry statuses
                team1.status = 'Matched';
                team2.status = 'Matched';

                updatedEntries.push(team1, team2);
            }
        }

        // Bulk create matches
        const matches = await MatchForTournament.bulkCreate(matchesData, { transaction });

        // Bulk update entry statuses
        await Entry.bulkCreate(updatedEntries, { updateOnDuplicate: ['status'], transaction });

        // Commit the transaction
        await transaction.commit();

        return res.status(201).json(matches);
    } catch (error: any) {
        // Rollback the transaction in case of errors
        await transaction.rollback();
        console.error('Error during matchmaking:', error);
        return res.status(500).json({ message: 'An error occurred during matchmaking.' });
    }
};
