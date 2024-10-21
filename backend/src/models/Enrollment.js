import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/connectDB.js";

const Enrollment = sequelize.define(
  "Enrollment",
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
    progress: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.0,
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Enrollment;
