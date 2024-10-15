import { Sequelize } from "sequelize";
import { Course, Section } from "../models/models.js";

export const addSection = async (req, res) => {
  const { course_id, position, title } = req.body; // Lấy title và course_id từ request body

  // Kiểm tra xem các trường cần thiết có tồn tại không
  if (!title || !course_id || !position) {
    return res
      .status(400)
      .json({ error: "Title and course_id, position are required" });
  }

  try {
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ error: "không tồn tại khóa học" });
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

export const getSectionEachCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
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
  const { id, title, position } = req.body;

  try {
    // Tìm section theo id
    const sectionToUpdate = await Section.findByPk(id);

    if (!sectionToUpdate) {
      return res.status(404).json({ error: "Section not found" });
    }

    const courseId = sectionToUpdate.course_id;

    // Fetch all sections for the course
    const allSections = await Section.findAll({
      where: { course_id: courseId },
      order: [["position", "ASC"]],
    });

    // Update title if provided
    sectionToUpdate.title = title || sectionToUpdate.title;

    // Handle position change
    if (position && position !== sectionToUpdate.position) {
      // Remove the section to update from the list
      const otherSections = allSections.filter(
        (section) => section.id !== sectionToUpdate.id
      );

      // Update positions of other sections
      if (position < sectionToUpdate.position) {
        // If moving the section up, shift down others
        otherSections.forEach((section) => {
          if (
            section.position >= position &&
            section.position < sectionToUpdate.position
          ) {
            section.position += 1;
            section.save();
          }
        });
      } else if (position > sectionToUpdate.position) {
        // If moving the section down, shift up others
        otherSections.forEach((section) => {
          if (
            section.position <= position &&
            section.position > sectionToUpdate.position
          ) {
            section.position -= 1;
            section.save();
          }
        });
      }

      // Finally, set the new position for the updated section
      sectionToUpdate.position = position;
    }

    await sectionToUpdate.save();

    // Fetch the updated list of sections after the update
    const updatedSections = await Section.findAll({
      where: { course_id: courseId },
      order: [["position", "ASC"]],
    });

    res.status(200).json({ message: "OK", sections: updatedSections });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSection = async (req, res) => {
  const { id } = req.query;

  try {
    // Find the section to be deleted by id
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    // Store the position of the section to be deleted
    const deletedSectionPosition = section.position;

    // Delete the section
    await section.destroy();

    // Find and update all sections with a higher position than the deleted one
    await Section.update(
      { position: Sequelize.literal("position - 1") },
      {
        where: {
          course_id: section.course_id,
          position: {
            [Sequelize.Op.gt]: deletedSectionPosition, // Only update sections with a higher position
          },
        },
      }
    );

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
