import { Request, Response } from 'express';
import Entry from '../../../models/tournament/entryModel';
import Tournament from '../../../models/tournament/tournamentModel';
import MatchForTournament from '../../../models/tournament/matchForTournamentModel';
import { matchValidationSchemaForTournament, tournamentIdValidationSchema } from '../../../validators/tournamentMatchValidator';


export const createTournamentMatch = async (req: Request, res: Response): Promise<any> => {
    try {
        const { error: tournamentIdError } = tournamentIdValidationSchema.validate(req.params);
        if (tournamentIdError) {
            return res.status(400).json({ message: tournamentIdError.details[0].message });
        }

        const { error: bodyError } = matchValidationSchemaForTournament.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: bodyError.details[0].message });
        }

        const { tournamentId } = req.params;
        const { team1Id, team2Id, start_time, end_time } = req.body;

        const tournament = await Tournament.findByPk(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        const team1 = await Entry.findByPk(team1Id);
        const team2 = await Entry.findByPk(team2Id);

        if (!team1) {
            return res.status(404).json({ message: 'Team 1 not found' });
        }
        if (!team2) {
            return res.status(404).json({ message: 'Team 2 not found' });
        }

        if (team1.status !== 'granted') {
            return res.status(400).json({ message: 'Team 1 is not granted yet' });
        }
        if (team2.status !== 'granted') {
            return res.status(400).json({ message: 'Team 2 is not granted yet' });
        }

        const match = await MatchForTournament.create({
            tournament_id: tournamentId,
            team1_id: team1Id,
            team2_id: team2Id,
            start_time,
            end_time,
            status: 'Pending',
        });

        return res.status(201).json(match);
    } catch (error: any) {
        console.error('Error creating match:', error);
        return res.status(500).json({ message: 'An error occurred while creating the match.' });
    }
};
