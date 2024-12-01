import { Request, Response } from 'express';
import Tournament from '../../../models/tournament/tournamentModel';



export const getTournaments = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page = 1, limit = 10, sort = 'start_time', order = 'ASC', name, start_time, end_time } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (name) {
      where.name = { $like: `%${name}%` };
    }
    if (start_time) {
      where.start_time = { $gte: new Date(start_time as string) };
    }
    if (end_time) {
      where.end_time = { $lte: new Date(end_time as string) };
    }

    // Fetch tournaments with pagination, filtering, and sorting
    const tournaments = await Tournament.findAndCountAll({
      where,
      order: [[sort as string, order as string]],
      limit: Number(limit),
      offset,
    });

    return res.status(200).json({
      currentPage: Number(page),
      totalPages: Math.ceil(tournaments.count / Number(limit)),
      totalCount: tournaments.count,
      tournaments: tournaments.rows,
    });
  } catch (error: any) {
    console.error("Error fetching tournaments:", error);
    return res.status(500).json({ message: "An error occurred while fetching tournaments." });
  }
};
