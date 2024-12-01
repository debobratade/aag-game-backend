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
exports.getTeamById = void 0;
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const getTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        if (isNaN(Number(teamId))) {
            return res.status(400).json({ message: 'Invalid team ID. It must be a number.' });
        }
        const team = yield teamModel_1.default.findByPk(teamId, {
            include: [
                { model: leagueModel_1.default, as: 'league' },
                { model: userModel_1.default, as: 'user' },
            ],
        });
        if (team) {
            res.json(team);
        }
        else {
            res.status(404).json({ message: 'Team not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTeamById = getTeamById;
