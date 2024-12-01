import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";
import League from "./leagueModel";
import Team from "./teamModel";

class Match extends Model {
  public id!: number;
  public leagueId!: number;
  public team1Id!: number;
  public team2Id!: number;
  public start_time!: Date;
  public end_time!: Date;
  public result?: string;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    leagueId: {
      type: DataTypes.INTEGER,
      references: {
        model: League,
        key: "id",
      },
    },
    team1Id: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: "id",
      },
    },
    team2Id: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    result: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Match",
    timestamps: true,
  }
);



export default Match;
