"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database/database"));
const leagueModel_1 = __importDefault(require("./leagueModel"));
const userModel_1 = __importDefault(require("../userModel"));
class Team extends sequelize_1.Model {
}
Team.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    leagueId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: leagueModel_1.default,
            key: "id",
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: userModel_1.default,
            key: "userId",
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "Team",
    timestamps: true,
});
exports.default = Team;
