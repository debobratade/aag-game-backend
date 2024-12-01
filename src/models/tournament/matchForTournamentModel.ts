import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";
import Tournament from "./tournamentModel";
import Entry from "./entryModel";

class MatchForTournament extends Model {
  public id!: number;
  public tournament_id!: number;
  public team1_id!: number;
  public team2_id!: number;
  public start_time!: Date;
  public end_time!: Date;
  public status!: string;
  public result?: string;
}

MatchForTournament.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tournament,
        key: "id",
      },
    },
    team1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Entry,
        key: "id",
      },
    },
    team2_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Entry,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    result: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "MatchForTournament",
    timestamps: true,
  }
);

export default MatchForTournament;
