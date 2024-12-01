"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTournaments = void 0;
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const getTournaments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sort = 'start_time', order = 'ASC', name, start_time, end_time } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const where = {};
        if (name) {
            where.name = { $like: `%${name}%` };
        }
        if (start_time) {
            where.start_time = { $gte: new Date(start_time) };
        }
        if (end_time) {
            where.end_time = { $lte: new Date(end_time) };
        }
        // Fetch tournaments with pagination, filtering, and sorting
        const tournaments = yield tournamentModel_1.default.findAndCountAll({
            where,
            order: [[sort, order]],
            limit: Number(limit),
            offset,
        });
        return res.status(200).json({
            currentPage: Number(page),
            totalPages: Math.ceil(tournaments.count / Number(limit)),
            totalCount: tournaments.count,
            tournaments: tournaments.rows,
        });
    }
    catch (error) {
        console.error("Error fetching tournaments:", error);
        return res.status(500).json({ message: "An error occurred while fetching tournaments." });
    }
});
exports.getTournaments = getTournaments;
