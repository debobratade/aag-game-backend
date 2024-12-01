import { Request, Response } from 'express';
import Entry from '../../../models/tournament/entryModel';
import MatchForTournament from '../../../models/tournament/matchForTournamentModel';
import Tournament from '../../../models/tournament/tournamentModel';


export const deleteTournament = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid tournament ID' });
    }

    try {
        await Entry.destroy({
            where: { tournament_id: id }
        });

        await MatchForTournament.destroy({
            where: { tournament_id: id }
        });

        const deletedCount = await Tournament.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        return res.status(204).end();
    } catch (error: any) {
        console.error('Error deleting tournament:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the tournament' });
    }
};
