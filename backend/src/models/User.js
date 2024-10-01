import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB.js"; // Đảm bảo thay đổi đường dẫn cho đúng

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor", "admin"),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false, // Tự động thêm createdAt và updatedAt
  }
);

export default User;
