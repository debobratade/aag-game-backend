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
exports.getLeagues = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const leagueValidator_1 = require("../../../validators/leagueValidator");
const getLeagues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate query parameters
    const { error } = leagueValidator_1.validateGetLeaguesQuery.validate(req.query);
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((d) => d.message).join(', '),
        });
    }
    const { page = 1, limit = 10, name, sortBy = 'start_time', order = 'ASC', } = req.query;
    try {
        const leagues = yield leagueModel_1.default.findAll({
            where: name ? { name } : undefined, // Apply filtering based on name if provided
            order: [[sortBy, order]], // Apply sorting on starting date
            offset: (parseInt(page) - 1) * parseInt(limit), // Pagination offset
            limit: parseInt(limit), // Pagination limit
        });
        return res.status(200).json(leagues);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getLeagues = getLeagues;
