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
exports.getTournamentById = void 0;
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const getTournamentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentId = req.params.id;
        if (!tournamentId || isNaN(Number(tournamentId))) {
            return res.status(400).json({ message: "Invalid tournament ID" });
        }
        const tournament = yield tournamentModel_1.default.findByPk(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: `Tournament with ID ${tournamentId} not found` });
        }
        return res.status(200).json({
            message: "Tournament retrieved successfully",
            data: tournament,
        });
    }
    catch (error) {
        console.error("Error fetching tournament by ID:", error);
        return res.status(500).json({ message: "An error occurred while fetching the tournament" });
    }
});
exports.getTournamentById = getTournamentById;
