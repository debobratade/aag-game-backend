import League from "../models/league/leagueModel";
import Match from "../models/league/matchModel";
import PhoneNumber from "../models/phoneNumberModel";
import Subscription from "../models/subscriptionModel";
import Team from "../models/league/teamModel";
import User from "../models/userModel";
import Tournament from "../models/tournament/tournamentModel";
import Entry from "../models/tournament/entryModel";
import MatchForTournament from "../models/tournament/matchForTournamentModel";


export default function setupAssociations() {
    // League ↔ Team
    League.hasMany(Team, { foreignKey: "leagueId", as: "teams" });
    Team.belongsTo(League, { foreignKey: "leagueId", as: "league" });

    // User ↔ Team
    User.hasMany(Team, { foreignKey: "userId", as: "teams" });
    Team.belongsTo(User, { foreignKey: "userId", as: "user" });

    // Match ↔ League
    Match.belongsTo(League, { foreignKey: "leagueId", as: "league" });

    // Match ↔ Team
    Match.belongsTo(Team, { foreignKey: "team1Id", as: "team1" });
    Match.belongsTo(Team, { foreignKey: "team2Id", as: "team2" });

    // User ↔ PhoneNumber
    User.belongsTo(PhoneNumber, { foreignKey: "phoneId" });

    // User ↔ Subscription
    User.belongsTo(Subscription, { foreignKey: "subscriptionId" });


    // Associations of Tournament 
    Tournament.hasMany(Entry, {
        foreignKey: "tournament_id",
        as: "entries", 
    });

    // Entry belongs to a Tournament
    Entry.belongsTo(Tournament, {
        foreignKey: "tournament_id",
        as: "tournament", 
    });

    // Entry belongs to a User
    Entry.belongsTo(User, {
        foreignKey: "user_id",
        as: "user", 
    });

    // MatchForTournament belongs to a Tournament
    MatchForTournament.belongsTo(Tournament, {
        foreignKey: "tournament_id",
        as: "tournament", 
    });

    // Tournament has many MatchForTournament
    Tournament.hasMany(MatchForTournament, {
        foreignKey: "tournament_id",
        as: "matches", 
    });

    // MatchForTournament references team1 (Entry)
    MatchForTournament.belongsTo(Entry, {
        foreignKey: "team1_id",
        as: "team1",
    });

    // MatchForTournament references team2 (Entry)
    MatchForTournament.belongsTo(Entry, {
        foreignKey: "team2_id",
        as: "team2", 
    });

    // User has many Entries
    User.hasMany(Entry, {
        foreignKey: "user_id",
        as: "entries", 
    });
}

