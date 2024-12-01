"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTournamentMatch_1 = require("../../controllers/tournament/tournamentMatchController/createTournamentMatch");
const updateMatchResult_1 = require("../../controllers/tournament/tournamentMatchController/updateMatchResult ");
const auth_1 = require("../../middleware/auth");
const matchmake_1 = require("../../controllers/tournament/tournamentMatchController/matchmake");
const router = express_1.default.Router();
router.post('/tournaments/:tournamentId/matches', auth_1.validateJWT, createTournamentMatch_1.createTournamentMatch);
router.put('/tournament/:matchId/result', auth_1.validateJWT, updateMatchResult_1.updateMatchResult);
router.post('/tournament/matchmake', matchmake_1.matchmake);
exports.default = router;
