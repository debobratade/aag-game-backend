import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";
import League from "./leagueModel";
import User from "../userModel";

class Team extends Model {
  public id!: number;
  public name!: string;
  public leagueId!: number;
  public userId!: number;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leagueId: {
      type: DataTypes.INTEGER,
      references: {
        model: League,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    sequelize,
    modelName: "Team",
    timestamps: true,
  }
);



export default Team;
