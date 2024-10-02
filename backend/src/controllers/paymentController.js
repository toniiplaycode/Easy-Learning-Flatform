import { Course, Payment, User } from "../models/models.js";

export const addPayment = async (req, res) => {
  const { course_id, user_id, amount, payment_method, status } = req.body;

  try {
    // Kiểm tra người dùng đã thanh toán khóa học đó chưa
    const existingPayment = await Payment.findOne({
      where: { course_id, user_id },
    });

    if (existingPayment) {
      return res.status(400).json({ error: "User was payment" });
    }

    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Tạo giao dịch thanh toán mới
    const payment = await Payment.create({
      course_id,
      user_id,
      amount,
      payment_method,
      status, // status có thể là 'pending', 'completed', 'failed', v.v.
    });

    res.status(201).json({ message: "OK", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailPayment = async (req, res) => {
  const { id } = req.query;

  try {
    const payment = await Payment.findByPk(id, {
      include: [
        {
          model: Course,
        },
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "OK", payment });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPaymentEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const payments = await Payment.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
        },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPaymentEachCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    const payments = await Payment.findAll({
      where: { course_id },
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching course payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
