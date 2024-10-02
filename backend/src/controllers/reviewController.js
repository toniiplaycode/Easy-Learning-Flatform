import { Course, Review, User } from "../models/models.js";

export const addReview = async (req, res) => {
  const { course_id, rating, comment } = req.body;

  const user_id = req.user.id; // lấy user của tài khoản đang đăng nhập

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Tạo một đánh giá mới
    const newReview = await Review.create({
      course_id,
      user_id,
      rating,
      comment,
    });

    res.status(201).json({ message: "OK", newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getReviewCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Lấy danh sách các đánh giá cho khóa học
    const reviews = await Review.findAll({
      where: { course_id },
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"], // Chỉ lấy các trường cần thiết từ User
        },
      ],
    });

    res.status(200).json({ message: "OK", reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailReview = async (req, res) => {
  const { id } = req.query;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "OK", review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateReview = async (req, res) => {
  const { id, rating, comment } = req.body;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user_id !== req.user.id) {
      return res.sendStatus(403); // chỉ được update đúng người đã add
    }

    // Cập nhật đánh giá
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save(); // Lưu các thay đổi

    res.status(200).json({ message: "OK", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.query;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user_id !== req.user.id) {
      return res.sendStatus(403); // chỉ được delete đúng người đã add
    }

    await review.destroy();

    res.status(200).send({ message: "OK" }); // Trả về mã 204 No Content khi xóa thành công
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
