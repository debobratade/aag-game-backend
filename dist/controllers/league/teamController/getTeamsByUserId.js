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
exports.getTeamsByUserId = void 0;
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const getTeamsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'Invalid userId. It must be a number.' });
            return;
        }
        const teams = yield teamModel_1.default.findAll({
            where: { userId },
            include: [
                { model: leagueModel_1.default, as: 'league', attributes: ['id', 'name'] },
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (teams.length === 0) {
            res.status(404).json({ message: 'No teams found for the given userId.' });
            return;
        }
        res.status(200).json(teams);
    }
    catch (error) {
        console.error('Error fetching teams by userId:', error);
        res.status(500).json({ message: 'An error occurred while fetching teams.' });
    }
});
exports.getTeamsByUserId = getTeamsByUserId;
