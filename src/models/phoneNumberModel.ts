import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

class PhoneNumber extends Model {
  public id!: number;
  public phoneNumber!: string;
  public isVerified!: boolean;
}

PhoneNumber.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    register: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "PhoneNumber",
    timestamps: true,
  }
);

export default PhoneNumber;
