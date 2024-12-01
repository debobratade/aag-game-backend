"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getTeamsByLeagueId_1 = require("../../controllers/league/teamController/getTeamsByLeagueId");
const getTeamById_1 = require("../../controllers/league/teamController/getTeamById");
const createTeam_1 = require("../../controllers/league/teamController/createTeam");
const getTeamsByUserId_1 = require("../../controllers/league/teamController/getTeamsByUserId");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get('/:leagueId/get-teams', auth_1.validateJWT, getTeamsByLeagueId_1.getTeamsByLeagueId);
router.get('/:teamId', auth_1.validateJWT, getTeamById_1.getTeamById);
router.post('/:leagueId/create-teams', auth_1.validateJWT, createTeam_1.createTeam);
router.get('/user/:userId', auth_1.validateJWT, getTeamsByUserId_1.getTeamsByUserId);
exports.default = router;
