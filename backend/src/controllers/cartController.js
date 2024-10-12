import {
  Course,
  User,
  Cart,
  Section,
  Lecture,
  Review,
  Enrollment,
} from "../models/models.js";

export const addCart = async (req, res) => {
  const { user_id, course_id } = req.body;

  try {
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

    // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
    const existingCart = await Cart.findOne({
      where: { user_id, course_id },
    });

    if (existingCart) {
      return res.status(400).json({ error: "Course already in Cart" });
    }

    // Kiểm tra xem khóa học đã có trong enrollment chưa
    const existingEnrollment = await Enrollment.findOne({
      where: { user_id, course_id },
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: "You enrollment in course" });
    }

    // Thêm khóa học vào danh sách mong muốn
    const cart = await Cart.create({
      user_id,
      course_id,
    });

    res.status(201).json({ message: "OK", cart });
  } catch (error) {
    console.error("Error adding course to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCartEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const carts = await Cart.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
          include: [
            {
              model: User,
              attributes: ["name", "email", "bio", "avatar"],
            },
            {
              model: Review,
            },
            {
              model: Section,
              include: [
                {
                  model: Lecture,
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json({ message: "OK", carts });
  } catch (error) {
    console.error("Error fetching user Cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.query;

  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({ message: "cart item not found" });
    }

    await cart.destroy();

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error removing course from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
