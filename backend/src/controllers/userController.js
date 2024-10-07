import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import "dotenv/config";
import { User } from "../models/models.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "student"; // mặc định khi mới đăng ký tk là student

    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({ message: "email already exist" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng mới vào CSDL
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Tạo JWT token
    const user = {
      id: newUser.id, // Sử dụng trường id từ model User
      name,
      email,
      role,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });

    // Trả về token và thông tin người dùng
    res.status(201).json({
      message: "OK",
      user: { id: newUser.id, name, email, role },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "ERROR" });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "ERROR" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Trả về thông tin người dùng và token
    res.json({
      message: "OK",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

export const detailUser = async (req, res) => {
  const id = req.query.id; // ID từ query string

  // Kiểm tra nếu `req.user.id` (từ token) khớp với `req.query.id`
  if (req.user.id !== parseInt(id)) {
    return res.sendStatus(403); // Forbidden nếu không đúng người dùng
  }

  const detailUser = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
  });

  res.json({
    message: "OK",
    user: detailUser, // Trả về thông tin người dùng từ token
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (users.length == 0) {
      res.status(400).json({ error: "Chưa có người dùng nào !" });
    }

    res.status(200).json({
      message: "OK",
      users: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

export const updateUser = async (req, res) => {
  const { id, name, password, bio, avatar } = req.body;

  try {
    // Lấy thông tin người dùng hiện tại
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng !" });
    }

    // Cập nhật thông tin
    if (name) user.name = name;
    if (user.dataValues.email) user.email = user.dataValues.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: "OK", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.query;

  try {
    // Lấy thông tin người dùng hiện tại
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng !" });
    }

    if (user) {
      await User.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "OK" }); // Nếu không tìm thấy người dùng
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
