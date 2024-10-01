import { Course, Section } from "../models/models.js";

export const addSection = async (req, res) => {
  const { course_id, position, title } = req.body; // Lấy title và course_id từ request body

  // Kiểm tra xem các trường cần thiết có tồn tại không
  if (!title || !course_id || !position) {
    return res
      .status(400)
      .json({ message: "Title and course_id, position are required" });
  }

  try {
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ message: "không tồn tại khóa học" });
    }

    // Tạo một section mới
    const newSection = await Section.create({
      course_id,
      title,
      position,
    });

    res.status(201).json({ message: "OK", newSection }); // Trả về section vừa tạo
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailSectionCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Lấy danh sách các phần của khóa học
    const sections = await Section.findAll({
      where: { course_id: course_id },
    });

    res.status(200).json({ message: "OK", sections });
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSection = async (req, res) => {
  const { id, title } = req.body;

  try {
    // Tìm section theo id
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    section.title = title || section.title;

    await section.save();

    res.status(200).json({ message: "OK", section }); // Trả về section đã cập nhật
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSection = async (req, res) => {
  const { id } = req.query;

  try {
    // Tìm section theo id
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Xóa section
    await section.destroy();

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
