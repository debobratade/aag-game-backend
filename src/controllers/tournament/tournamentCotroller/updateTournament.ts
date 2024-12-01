import { Request, Response } from 'express';
import { tournamentUpdateValidator } from '../../../validators/tournamentValidator';
import Tournament from '../../../models/tournament/tournamentModel';

export const updateTournament = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, start_time, end_time, description, entry_fee, prize_distribution } = req.body;

  const { error, value } = tournamentUpdateValidator.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation errors",
      details: error.details.map((detail: any) => detail.message.replace(/"/g, '')).join(', '),
    });
  }

  // Additional validation for start_time and end_time
  const currentTime = new Date();

  // Ensure the start time and end time are not in the past
  if (new Date(start_time) < currentTime) {
    return res.status(400).json({ message: 'Start time cannot be in the past' });
  }

  if (new Date(end_time) < currentTime) {
    return res.status(400).json({ message: 'End time cannot be in the past' });
  }

  // Ensure the end time is greater than start time
  if (new Date(start_time) >= new Date(end_time)) {
    return res.status(400).json({ message: 'End time must be greater than start time' });
  }

  try {
    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({ message: `Tournament with ID ${id} not found` });
    }

    await tournament.update(value);

    return res.status(200).json({
      message: "Tournament updated successfully",
      tournament,
    });
  } catch (error: any) {
    console.error("Error updating tournament:", error);
    return res.status(500).json({ message: "An error occurred while updating the tournament" });
  }
};
