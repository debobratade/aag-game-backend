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
exports.createMatch = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const matchModel_1 = __importDefault(require("../../../models/league/matchModel"));
const leagueMatchValidator_1 = require("../../../validators/leagueMatchValidator");
const sequelize_1 = require("sequelize");
const createMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = leagueMatchValidator_1.validateCreateMatch.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
            });
        }
        const league = yield leagueModel_1.default.findByPk(req.params.leagueId);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        const [team1, team2] = yield Promise.all([
            teamModel_1.default.findByPk(req.body.team1Id),
            teamModel_1.default.findByPk(req.body.team2Id),
        ]);
        if (!team1 || !team2) {
            return res.status(404).json({ message: 'One or both teams not found' });
        }
        // Ensure the match times are within the league's start and end dates
        if (req.body.start_time < league.start_time ||
            req.body.end_time > league.end_time ||
            req.body.start_time >= req.body.end_time) {
            return res.status(400).json({
                message: `Match times must be within the league's start (${league.start_time}) and end (${league.end_time}) dates, and the start time must precede the end time.`,
            });
        }
        // Check for overlapping matches between the same teams
        const overlappingMatch = yield matchModel_1.default.findOne({
            where: {
                leagueId: req.params.leagueId,
                start_time: { [sequelize_1.Op.lt]: req.body.end_time }, // Existing match starts before the new match ends
                end_time: { [sequelize_1.Op.gt]: req.body.start_time }, // Existing match ends after the new match starts
                [sequelize_1.Op.or]: [
                    { team1Id: req.body.team1Id, team2Id: req.body.team2Id },
                    { team1Id: req.body.team2Id, team2Id: req.body.team1Id },
                ],
            },
        });
        if (overlappingMatch) {
            return res.status(400).json({
                message: `A match between the same teams already exists in the time frame (${overlappingMatch.start_time} - ${overlappingMatch.end_time}).`,
            });
        }
        // Create the new match
        const match = yield matchModel_1.default.create({
            leagueId: req.params.leagueId,
            team1Id: req.body.team1Id,
            team2Id: req.body.team2Id,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            result: req.body.result,
        });
        res.status(201).json(match);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createMatch = createMatch;
