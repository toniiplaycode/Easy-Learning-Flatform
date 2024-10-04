import { Course, User, Wishlist } from "../models/models.js";

export const addWishlist = async (req, res) => {
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

    // Kiểm tra xem khóa học đã có trong danh sách mong muốn chưa
    const existingWishlist = await Wishlist.findOne({
      where: { user_id, course_id },
    });

    if (existingWishlist) {
      return res.status(400).json({ error: "Course already in wishlist" });
    }

    // Thêm khóa học vào danh sách mong muốn
    const wishlist = await Wishlist.create({
      user_id,
      course_id,
    });

    res.status(201).json({ message: "OK", wishlist });
  } catch (error) {
    console.error("Error adding course to wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWishlistEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const wishlists = await Wishlist.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
        },
      ],
    });

    res.status(200).json({ message: "OK", wishlists });
  } catch (error) {
    console.error("Error fetching user wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteWishlist = async (req, res) => {
  const { id } = req.query;

  try {
    const wishlist = await Wishlist.findByPk(id);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await wishlist.destroy();

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error removing course from wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
