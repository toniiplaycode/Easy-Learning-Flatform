import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import pool from "../config/connectDB.js";
import "dotenv/config";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Kiểm tra xem email đã tồn tại hay chưa
    const [rows] = await pool.execute("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng mới vào CSDL
    const [result] = await pool.execute(
      "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    // Tạo JWT token
    const user = {
      id: result.insertId,
      name,
      email,
      role,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });

    // Trả về token và thông tin người dùng
    res.status(201).json({
      message: "Đăng ký thành công",
      user: { id: result.insertId, name, email, role },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại hay không
    const [rows] = await pool.execute("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    const user = rows[0];

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Trả về thông tin người dùng và token
    res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
