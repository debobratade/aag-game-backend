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
exports.createTeam = void 0;
const teamValidator_1 = require("../../../validators/teamValidator");
const leagueModel_1 = __importDefault(require("../../../models/league/leagueModel"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const teamModel_1 = __importDefault(require("../../../models/league/teamModel"));
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = teamValidator_1.validateCreateTeam.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((d) => d.message.replace(/"/g, '')).join(', '),
        });
    }
    try {
        const league = yield leagueModel_1.default.findByPk(req.params.leagueId);
        const user = yield userModel_1.default.findByPk(req.body.userId);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const team = yield teamModel_1.default.create({
            name: req.body.name,
            leagueId: req.params.leagueId,
            userId: req.body.userId,
        });
        return res.status(201).json(team);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createTeam = createTeam;
