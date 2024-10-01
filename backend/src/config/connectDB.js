import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

// Thay đổi các thông số dưới đây theo cấu hình của bạn
const sequelize = new Sequelize("easy-learning", "root", "123", {
  host: "localhost", // Địa chỉ host của cơ sở dữ liệu
  dialect: "mysql", // Chọn loại cơ sở dữ liệu
  dialectModule: mysql2,
  logging: false, // Đặt thành true nếu bạn muốn xem các truy vấn SQL
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("connect DB successfully !");
  } catch (error) {
    console.error("connect DB failed:", error);
  }
};

testConnection();

export default sequelize;
