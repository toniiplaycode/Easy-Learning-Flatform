import { Cart, Course, Enrollment, Section, User } from "../models/models.js";

export const addEnrollment = async (req, res) => {
  const { user_id, course_id } = req.body;

  try {
    // Ensure course_id is an array for bulk enrollment
    if (!Array.isArray(course_id)) {
      return res.status(400).json({ error: "course_id should be an array" });
    }

    const enrollments = [];

    // Loop through the array of course IDs
    for (let i = 0; i < course_id.length; i++) {
      const courseId = course_id[i];

      // Check if the course exists
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ error: `Course with id ${courseId} not found` });
      }

      // Check if the user is already enrolled in the course
      const existingEnrollment = await Enrollment.findOne({
        where: { course_id: courseId, user_id },
      });

      if (existingEnrollment) {
        return res.status(400).json({
          error: `User already enrolled in course with id ${courseId}`,
        });
      }

      // Create a new enrollment record
      const enrollment = await Enrollment.create({
        course_id: courseId,
        user_id,
        progress: 0.0,
      });

      enrollments.push(enrollment); // Collect created enrollments

      await Cart.destroy({
        where: {
          course_id: courseId,
          user_id: user_id,
        },
      });
    }

    // Return all created enrollments
    res.status(201).json(enrollments);
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEnrollmentEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
          include: [
            {
              model: User,
              attributes: ["name", "email", "bio"],
            },
            {
              model: Section,
            },
          ],
        },
      ],
    });

    res.status(200).json({ message: "OK", enrollments });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEnrollmentAllUser = async (req, res) => {
  const { course_id } = req.query;

  try {
    const enrollments = await Enrollment.findAll({
      where: { course_id },
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"], // Lấy các trường cần thiết từ User
        },
      ],
    });

    res.status(200).json({ message: "OK", enrollments });
  } catch (error) {
    console.error("Error fetching course enrollments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailEnrollment = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ error: "id is required" });
  }

  try {
    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Course,
        },
        {
          model: User,
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.status(200).json({ message: "OK", enrollment });
  } catch (error) {
    console.error("Error fetching enrollment details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.query;

  try {
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await enrollment.destroy();

    res.status(200).send({ message: "OK" }); // Thành công, không có nội dung trả về
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
