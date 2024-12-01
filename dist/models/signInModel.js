"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const userModel_1 = __importDefault(require("./userModel"));
const phoneNumberModel_1 = __importDefault(require("./phoneNumberModel"));
class SignIn extends sequelize_1.Model {
}
SignIn.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: userModel_1.default,
            key: "userId",
        },
    },
    phoneId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: phoneNumberModel_1.default,
            key: "id",
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "SignIn",
    timestamps: true,
});
// Define associations
SignIn.belongsTo(userModel_1.default, { foreignKey: "userId" });
SignIn.belongsTo(phoneNumberModel_1.default, { foreignKey: "phoneId" });
exports.default = SignIn;
