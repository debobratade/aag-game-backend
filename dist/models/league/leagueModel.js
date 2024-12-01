"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database/database"));
class League extends sequelize_1.Model {
}
League.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    entry_fee: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.default,
    modelName: "League",
    timestamps: true,
});
exports.default = League;
