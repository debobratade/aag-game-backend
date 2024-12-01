import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";
import Tournament from "./tournamentModel";
import User from "../userModel";


class Entry extends Model {
  public id!: number;
  public tournament_id!: number;
  public user_id!: number;
  public status!: string;
}

Entry.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Entry",
    timestamps: true,
  }
);

export default Entry;
