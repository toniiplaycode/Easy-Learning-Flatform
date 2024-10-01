import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB.js";

const Coupon = sequelize.define(
  "Coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Coupon;
