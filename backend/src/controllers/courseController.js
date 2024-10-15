import { Sequelize } from "sequelize";
import {
  Category,
  Course,
  Lecture,
  Review,
  Section,
  User,
} from "../models/models.js";

export const addCourse = async (req, res) => {
  const {
    title,
    description,
    instructor_id, // id user là instructor
    category_id,
    price,
    level,
    language,
    img,
  } = req.body;

  // Kiểm tra xem các trường cần thiết có tồn tại không
  if (!title || !instructor_id || !category_id) {
    return res.status(400).json({
      error: "Title, instructor_id, category_id, and price are required",
    });
  }

  try {
    const newCourse = await Course.create({
      title,
      description,
      instructor_id, // id user là instructor
      category_id,
      price,
      level,
      language,
      img,
    });

    res.status(201).json({ message: "OK", newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "bio"],
        },
        {
          model: Category,
        },
        {
          model: Review,
          where: { course_id: Sequelize.col("Course.id") },
          required: false,
        },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseInstructor = async (req, res) => {
  const { instructor_id } = req.query;

  try {
    const course = await Course.findAll({ where: { instructor_id } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "OK", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailCourse = async (req, res) => {
  const { id } = req.query;

  try {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "bio"],
        },
        {
          model: Category,
        },
        {
          model: Review,
          where: { course_id: Sequelize.col("Course.id") },
          required: false,
        },
        {
          model: Section,
          where: { course_id: Sequelize.col("Course.id") },
          required: false,
          include: [
            {
              model: Lecture,
              where: { course_id: Sequelize.col("Course.id") },
              required: false,
            },
          ],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found !" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCourse = async (req, res) => {
  const { id, title, description, category_id, price, level, language, img } =
    req.body;

  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category_id = category_id || course.category_id;
    course.price = price || course.price;
    course.level = level || course.level;
    course.language = language || course.language;
    course.img = img || course.img;

    await course.save(); // Lưu các thay đổi

    res.status(200).json({ message: "OK", course }); // Trả về khóa học đã cập nhật
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.query;

  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: "Không tìm thấy khóa học !" });
    }

    if (course) {
      await course.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
