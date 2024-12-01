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
exports.getMatchResultById = void 0;
const matchModel_1 = __importDefault(require("../../../models/league/matchModel"));
// Get match result by matchId
const getMatchResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchId = Number(req.params.matchId);
        if (isNaN(matchId)) {
            return res.status(400).json({ message: "Invalid match ID format" });
        }
        const match = yield matchModel_1.default.findByPk(matchId, {
            attributes: ['result'],
        });
        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }
        res.status(200).json({ result: match.result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMatchResultById = getMatchResultById;
