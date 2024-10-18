import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB.js";

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: Date,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Course;
