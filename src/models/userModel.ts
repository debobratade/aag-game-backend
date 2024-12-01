import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import PhoneNumber from "./phoneNumberModel";
import Subscription from "./subscriptionModel";
import Team from "./league/teamModel";

class User extends Model {
  public userId!: number;
  public username!: string;
  public email!: string;
  public phoneId?: number;
  public googleId?: string;
  public facebookId?: string;
  public appleId?: string;
  public subscriptionId?: number;
  public profile?: {
    name: string;
    socialMedia?: {
      instagram?: string;
      telegram?: string;
      youtube?: string;
    };
  };
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneId: {
      type: DataTypes.INTEGER,
      references: {
        model: PhoneNumber, // references PhoneNumber model
        key: "id", // references the id field in PhoneNumber model
      },
    },
    googleId: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.STRING,
    },
    appleId: {
      type: DataTypes.STRING,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subscription, // references Subscription model
        key: "subscriptionId", // references the id field in Subscription model
      },
    },
    profile: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);



export default User;
