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
exports.getUserEntries = void 0;
const userModel_1 = __importDefault(require("../../../models/userModel"));
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
const tournamentModel_1 = __importDefault(require("../../../models/tournament/tournamentModel"));
const getUserEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const entries = yield entryModel_1.default.findAll({
            where: { user_id: userId },
            include: [{
                    model: tournamentModel_1.default,
                    as: 'tournament',
                    attributes: ['id', 'name', 'start_time', 'end_time']
                }],
        });
        if (entries.length === 0) {
            return res.status(200).json({ message: 'No entries found for this user' });
        }
        return res.status(200).json(entries);
    }
    catch (error) {
        console.error("Error fetching user entries:", error);
        return res.status(500).json({ message: 'An error occurred while fetching the user entries.' });
    }
});
exports.getUserEntries = getUserEntries;
