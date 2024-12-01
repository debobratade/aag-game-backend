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
exports.createLeague = void 0;
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const leagueValidator_1 = require("../../../validators/leagueValidator");
// Create new league
const createLeague = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request body using Joi
    const { error } = leagueValidator_1.validateCreateLeague.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json({
            message: 'Validation error',
            details: errorMessage,
        });
    }
    try {
        const { name, start_time } = req.body;
        // Check if a league with the same name already exists
        const existingLeague = yield leagueModel_1.default.findOne({
            where: { name },
            order: [['end_time', 'DESC']],
        });
        if (existingLeague) {
            const existingEndDate = new Date(existingLeague.end_time);
            const newStartDate = new Date(start_time);
            if (newStartDate <= existingEndDate) {
                return res.status(400).json({
                    message: `A league named ${name} is already scheduled from ${existingLeague.start_time} to ${existingLeague.end_time}.`,
                });
            }
        }
        // Create the league if no conflicts are found
        const league = yield leagueModel_1.default.create(req.body);
        res.status(201).json(league);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createLeague = createLeague;
