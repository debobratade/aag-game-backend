"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getMatchesByLeagueId_1 = require("../../controllers/league/matchController/getMatchesByLeagueId");
const getMatchById_1 = require("../../controllers/league/matchController/getMatchById");
const createMatch_1 = require("../../controllers/league/matchController/createMatch");
const updateMatchResult_1 = require("../../controllers/league/matchController/updateMatchResult");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get('/league/:leagueId', auth_1.validateJWT, getMatchesByLeagueId_1.getMatchesByLeagueId);
router.get('/:matchId', auth_1.validateJWT, getMatchById_1.getMatchById);
router.post('/:leagueId/create-matches', auth_1.validateJWT, createMatch_1.createMatch);
router.put('/:matchId/result', auth_1.validateJWT, updateMatchResult_1.updateMatchResult);
exports.default = router;
