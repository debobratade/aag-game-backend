"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getLeagues_1 = require("../../controllers/league/leagueController/getLeagues");
const getLeagueById_1 = require("../../controllers/league/leagueController/getLeagueById");
const createLeague_1 = require("../../controllers/league/leagueController/createLeague");
const updateLeague_1 = require("../../controllers/league/leagueController/updateLeague");
const deleteLeague_1 = require("../../controllers/league/leagueController/deleteLeague");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get('/get-leagues', auth_1.validateJWT, getLeagues_1.getLeagues);
router.get('/:id', auth_1.validateJWT, getLeagueById_1.getLeagueById);
router.post('/create-leagues', auth_1.validateJWT, createLeague_1.createLeague);
router.put('/update-leagues/:id', auth_1.validateJWT, updateLeague_1.updateLeague);
router.delete('/delete-leagues/:id', auth_1.validateJWT, deleteLeague_1.deleteLeague);
exports.default = router;
