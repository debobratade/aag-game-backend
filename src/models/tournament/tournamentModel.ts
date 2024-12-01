import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";

class Tournament extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public entry_fee?: number;
  public start_time!: Date;
  public end_time!: Date;
  public prize_distribution?: object;
}

Tournament.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    entry_fee: {
      type: DataTypes.DECIMAL(10, 2),
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    prize_distribution: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Tournament",
    timestamps: true,
  }
);

export default Tournament;
