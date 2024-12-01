"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const phoneNumberModel_1 = __importDefault(require("./phoneNumberModel"));
const subscriptionModel_1 = __importDefault(require("./subscriptionModel"));
class User extends sequelize_1.Model {
}
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: phoneNumberModel_1.default, // references PhoneNumber model
            key: "id", // references the id field in PhoneNumber model
        },
    },
    googleId: {
        type: sequelize_1.DataTypes.STRING,
    },
    facebookId: {
        type: sequelize_1.DataTypes.STRING,
    },
    appleId: {
        type: sequelize_1.DataTypes.STRING,
    },
    subscriptionId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: subscriptionModel_1.default, // references Subscription model
            key: "subscriptionId", // references the id field in Subscription model
        },
    },
    profile: {
        type: sequelize_1.DataTypes.JSON,
    },
}, {
    sequelize: database_1.default,
    modelName: "User",
    timestamps: true,
});
exports.default = User;
