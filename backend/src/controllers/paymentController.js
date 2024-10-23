import { Course, Payment, User } from "../models/models.js";

export const addPayment = async (req, res) => {
  const { course_id, user_id, amount, payment_method, status } = req.body;

  try {
    // Check if course_id and amount are arrays and they have the same length
    if (
      !Array.isArray(course_id) ||
      !Array.isArray(amount) ||
      course_id.length !== amount.length
    ) {
      return res.status(400).json({
        error: "course_id and amount must be arrays of the same length",
      });
    }

    const payments = [];

    // Loop through each course and amount
    for (let i = 0; i < course_id.length; i++) {
      const courseId = course_id[i];
      const courseAmount = amount[i];

      // Check if the user has already made a payment for this course
      const existingPayment = await Payment.findOne({
        where: { course_id: courseId, user_id },
      });

      if (existingPayment) {
        return res.status(400).json({
          error: `User has already paid for course with id ${courseId}`,
        });
      }

      // Check if the course exists
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ error: `Course with id ${courseId} not found` });
      }

      // Check if the user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new payment record for each course
      const payment = await Payment.create({
        course_id: courseId,
        user_id,
        amount: courseAmount,
        payment_method,
        status, // status can be 'pending', 'completed', 'failed', etc.
      });

      payments.push(payment); // Collect the created payments
    }

    // Return all created payments
    res.status(201).json({ message: "OK", payments });
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

export const getAllPaymentAllCourse = async (req, res) => {
  const { instructor_id } = req.query;

  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Course,
          where: {
            instructor_id,
          },
        },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching course payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
