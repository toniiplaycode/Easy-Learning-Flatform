import mysql from "mysql2/promise";

// MySQL Connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "easy-learning",
  password: "123", // Thay đổi mật khẩu nếu cần
});

export default pool;
