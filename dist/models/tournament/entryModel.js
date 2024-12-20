"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database/database"));
const tournamentModel_1 = __importDefault(require("./tournamentModel"));
const userModel_1 = __importDefault(require("../userModel"));
class Entry extends sequelize_1.Model {
}
Entry.init({
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
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: userModel_1.default,
            key: "userId",
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "Entry",
    timestamps: true,
});
exports.default = Entry;
