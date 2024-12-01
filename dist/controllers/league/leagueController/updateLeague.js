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
exports.updateLeague = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const leagueValidator_1 = require("../../../validators/leagueValidator"); // Assuming this is your Joi validation
const sequelize_1 = require("sequelize");
// Update league
const updateLeague = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = leagueValidator_1.validateCreateLeague.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map((detail) => detail.message.replace(/"/g, '')).join(', '),
            });
        }
        const league = yield leagueModel_1.default.findByPk(req.params.id);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        // Check if the start_time overlaps with any existing league
        const { name, start_time, end_time } = req.body;
        const existingLeague = yield leagueModel_1.default.findOne({
            where: {
                name,
                end_time: { [sequelize_1.Op.gte]: start_time }, // Ensure no overlap of dates
            },
        });
        if (existingLeague) {
            return res.status(400).json({
                message: `A league with the same name already exists from ${existingLeague.start_time} to ${existingLeague.end_time}.`,
            });
        }
        // If no overlap, update the league
        yield league.update(req.body);
        return res.status(200).json(league);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateLeague = updateLeague;
