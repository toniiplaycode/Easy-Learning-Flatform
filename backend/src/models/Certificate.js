import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB.js";

const Certificate = sequelize.define(
  "Certificate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    certificate_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Certificate;
