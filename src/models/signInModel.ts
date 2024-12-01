import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import User from "./userModel";
import PhoneNumber from "./phoneNumberModel";

class SignIn extends Model {
  public id!: number;
  public userId!: number;
  public phoneId!: number;
  public password!: string;
}

SignIn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    phoneId: {
      type: DataTypes.INTEGER,
      references: {
        model: PhoneNumber,
        key: "id",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SignIn",
    timestamps: true,
  }
);

// Define associations
SignIn.belongsTo(User, { foreignKey: "userId" });
SignIn.belongsTo(PhoneNumber, { foreignKey: "phoneId" });

export default SignIn;
