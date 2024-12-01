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
exports.getLeagueById = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const getLeagueById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leagueId = parseInt(req.params.id, 10);
        // Validate the league ID parameter
        if (isNaN(leagueId)) {
            res.status(400).json({ message: 'Invalid league ID. It must be a number.' });
            return;
        }
        // Fetch the league with optional eager loading of associated teams
        const league = yield leagueModel_1.default.findByPk(leagueId, {
            include: [
                {
                    model: teamModel_1.default,
                    as: 'teams',
                },
            ],
            // Exclude unnecessary fields
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        if (!league) {
            res.status(404).json({ message: 'League not found.' });
            return;
        }
        res.status(200).json(league);
    }
    catch (error) {
        console.error('Error fetching league by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the league.' });
    }
});
exports.getLeagueById = getLeagueById;
