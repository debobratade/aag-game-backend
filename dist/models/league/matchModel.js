"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database/database"));
const leagueModel_1 = __importDefault(require("./leagueModel"));
const teamModel_1 = __importDefault(require("./teamModel"));
class Match extends sequelize_1.Model {
}
Match.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    leagueId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: leagueModel_1.default,
            key: "id",
        },
    },
    team1Id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: teamModel_1.default,
            key: "id",
        },
    },
    team2Id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: teamModel_1.default,
            key: "id",
        },
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
    },
    result: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "Match",
    timestamps: true,
});
exports.default = Match;
