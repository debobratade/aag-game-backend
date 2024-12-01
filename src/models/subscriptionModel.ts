import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

class Subscription extends Model {
  public subscriptionId!: number;
  public name!: string;
  public features!: string[];
  public price!: number | string;
}

Subscription.init(
  {
    subscriptionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Subscription",
    timestamps: true,
  }
);

export default Subscription;
