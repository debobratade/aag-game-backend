import { Request, Response } from 'express';
import Tournament from '../../../models/tournament/tournamentModel';



export const getTournamentById = async (req: Request, res: Response): Promise<any> => {
  try {
    const tournamentId = req.params.id;

    if (!tournamentId || isNaN(Number(tournamentId))) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: `Tournament with ID ${tournamentId} not found` });
    }

    return res.status(200).json({
      message: "Tournament retrieved successfully",
      data: tournament,
    });
  } catch (error: any) {
    console.error("Error fetching tournament by ID:", error);
    return res.status(500).json({ message: "An error occurred while fetching the tournament" });
  }
};
