"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enterTournament_1 = require("../../controllers/tournament/entryController/enterTournament");
const getUserEntries_1 = require("../../controllers/tournament/entryController/getUserEntries");
const updateEntryStatus_1 = require("../../controllers/tournament/entryController/updateEntryStatus");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
// Apply validation middleware to your route
router.post('/tournament/:tournamentId/enter', auth_1.validateJWT, enterTournament_1.enterTournament);
router.get('/user/:userId/entries', auth_1.validateJWT, getUserEntries_1.getUserEntries);
router.put('/entries/:entryId/status', auth_1.validateJWT, updateEntryStatus_1.updateEntryStatus);
exports.default = router;
