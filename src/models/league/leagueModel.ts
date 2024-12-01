import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/database";

class League extends Model {
  public id!: number;
  public name!: string;
  public entry_fee?: number;
  public start_time!: Date;
  public end_time!: Date;
}

League.init(
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
    entry_fee: {
      type: DataTypes.DECIMAL(10, 2),
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "League",
    timestamps: true,
  }
);



export default League;
