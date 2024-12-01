import { Request, Response } from 'express';
import { tournamentCreateValidator } from '../../../validators/tournamentValidator';
import Tournament from '../../../models/tournament/tournamentModel';

export const createTournament = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = tournamentCreateValidator.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ 
        message: "Validation errors", 
        details: error.details.map((detail: any) => detail.message.replace(/"/g, '')).join(', '),
      });
    }

    const { name, start_time, end_time } = value;
    
    // Additional validation for start_time and end_time
    const currentTime = new Date();

    // Ensure start_time is not in the past
    if (new Date(start_time) < currentTime) {
      return res.status(400).json({ message: 'Start time cannot be in the past' });
    }

    // Ensure end_time is not in the past
    if (new Date(end_time) < currentTime) {
      return res.status(400).json({ message: 'End time cannot be in the past' });
    }

    // Ensure end_time is greater than start_time
    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ message: 'End time must be greater than start time' });
    }

    // Check for conflicting tournaments
    const existingTournament = await Tournament.findOne({
      where: { name },
      order: [['end_time', 'DESC']],
    });

    if (existingTournament) {
      const existingEndDate = new Date(existingTournament.end_time);
      const newStartDate = new Date(start_time);

      if (newStartDate <= existingEndDate) {
        return res.status(400).json({
          message: `A tournament named ${name} is already scheduled from ${existingTournament.start_time} to ${existingTournament.end_time}.`,
        });
      }
    }

    const tournament = await Tournament.create(value);

    return res.status(201).json({
      message: "Tournament created successfully",
      tournament,
    });
  } catch (error: any) {
    console.error("Error creating tournament:", error);
    return res.status(500).json({ message: "An error occurred while creating the tournament" });
  }
};
