"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database/database"));
const tournamentModel_1 = __importDefault(require("./tournamentModel"));
const entryModel_1 = __importDefault(require("./entryModel"));
class MatchForTournament extends sequelize_1.Model {
}
MatchForTournament.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tournament_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tournamentModel_1.default,
            key: "id",
        },
    },
    team1_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: entryModel_1.default,
            key: "id",
        },
    },
    team2_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: entryModel_1.default,
            key: "id",
        },
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    result: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "MatchForTournament",
    timestamps: true,
});
exports.default = MatchForTournament;
