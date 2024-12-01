import { Request, Response } from 'express';
import { matchIdValidationSchema, resultValidationSchema } from '../../../validators/tournamentMatchValidator';
import MatchForTournament from '../../../models/tournament/matchForTournamentModel';

export const updateMatchResult = async (req: Request, res: Response): Promise<any> => {
    try {
        const { error: paramError } = matchIdValidationSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({ message: paramError.details[0].message });
        }

        const { error: bodyError } = resultValidationSchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: bodyError.details[0].message });
        }

        const { matchId } = req.params;
        const { result } = req.body;

        const match = await MatchForTournament.findByPk(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        match.result = result;
        match.status = 'Completed';
        await match.save();

        return res.status(200).json({
            message: 'Match result updated successfully',
            match,
        });
    } catch (error: any) {
        console.error('Error updating match result:', error);
        return res.status(500).json({ message: 'An error occurred while updating the match result.' });
    }
};
