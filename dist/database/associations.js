"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupAssociations;
const leagueModel_1 = __importDefault(require("../models/league/leagueModel"));
const matchModel_1 = __importDefault(require("../models/league/matchModel"));
const phoneNumberModel_1 = __importDefault(require("../models/phoneNumberModel"));
const subscriptionModel_1 = __importDefault(require("../models/subscriptionModel"));
const teamModel_1 = __importDefault(require("../models/league/teamModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const tournamentModel_1 = __importDefault(require("../models/tournament/tournamentModel"));
const entryModel_1 = __importDefault(require("../models/tournament/entryModel"));
const matchForTournamentModel_1 = __importDefault(require("../models/tournament/matchForTournamentModel"));
function setupAssociations() {
    // League ↔ Team
    leagueModel_1.default.hasMany(teamModel_1.default, { foreignKey: "leagueId", as: "teams" });
    teamModel_1.default.belongsTo(leagueModel_1.default, { foreignKey: "leagueId", as: "league" });
    // User ↔ Team
    userModel_1.default.hasMany(teamModel_1.default, { foreignKey: "userId", as: "teams" });
    teamModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
    // Match ↔ League
    matchModel_1.default.belongsTo(leagueModel_1.default, { foreignKey: "leagueId", as: "league" });
    // Match ↔ Team
    matchModel_1.default.belongsTo(teamModel_1.default, { foreignKey: "team1Id", as: "team1" });
    matchModel_1.default.belongsTo(teamModel_1.default, { foreignKey: "team2Id", as: "team2" });
    // User ↔ PhoneNumber
    userModel_1.default.belongsTo(phoneNumberModel_1.default, { foreignKey: "phoneId" });
    // User ↔ Subscription
    userModel_1.default.belongsTo(subscriptionModel_1.default, { foreignKey: "subscriptionId" });
    // Associations of Tournament 
    tournamentModel_1.default.hasMany(entryModel_1.default, {
        foreignKey: "tournament_id",
        as: "entries",
    });
    // Entry belongs to a Tournament
    entryModel_1.default.belongsTo(tournamentModel_1.default, {
        foreignKey: "tournament_id",
        as: "tournament",
    });
    // Entry belongs to a User
    entryModel_1.default.belongsTo(userModel_1.default, {
        foreignKey: "user_id",
        as: "user",
    });
    // MatchForTournament belongs to a Tournament
    matchForTournamentModel_1.default.belongsTo(tournamentModel_1.default, {
        foreignKey: "tournament_id",
        as: "tournament",
    });
    // Tournament has many MatchForTournament
    tournamentModel_1.default.hasMany(matchForTournamentModel_1.default, {
        foreignKey: "tournament_id",
        as: "matches",
    });
    // MatchForTournament references team1 (Entry)
    matchForTournamentModel_1.default.belongsTo(entryModel_1.default, {
        foreignKey: "team1_id",
        as: "team1",
    });
    // MatchForTournament references team2 (Entry)
    matchForTournamentModel_1.default.belongsTo(entryModel_1.default, {
        foreignKey: "team2_id",
        as: "team2",
    });
    // User has many Entries
    userModel_1.default.hasMany(entryModel_1.default, {
        foreignKey: "user_id",
        as: "entries",
    });
}
