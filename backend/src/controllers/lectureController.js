import { Op, Sequelize } from "sequelize";
import { Lecture, Section } from "../models/models.js";

export const addLecture = async (req, res) => {
  let { section_id, title, description, video_url, duration, position } =
    req.body;

  try {
    // Find the section to ensure it exists
    const section = await Section.findByPk(section_id);

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    if (!title || !description || !video_url || !duration || !position) {
      return res.status(400).json({
        error:
          "title, video_url, description, duration, and position are required",
      });
    }

    // Get the course_id from the section, so we can handle all sections in the course
    const course_id = section.course_id;

    // Find all lectures in the course, ordered by position
    const allLecturesInCourse = await Lecture.findAll({
      include: [
        {
          model: Section,
          where: { course_id }, // Match all sections in the same course
        },
      ],
      order: [["position", "ASC"]], // Order by position to update correctly
    });

    // Now we need to adjust positions of lectures starting from the desired position

    const lecturesToUpdate = allLecturesInCourse.filter(
      (lecture) => lecture.position >= position
    );

    // Increment the position of each affected lecture
    await Promise.all(
      lecturesToUpdate.map(async (lecture) => {
        lecture.position += 1;
        await lecture.save();
      })
    );

    // Finally, create the new lecture at the desired position
    const newLecture = await Lecture.create({
      section_id,
      title,
      description,
      video_url,
      duration,
      position,
    });

    res.status(201).json({ message: "OK", newLecture });
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLectureSection = async (req, res) => {
  const { section_id } = req.query;

  try {
    // Kiểm tra xem phần có tồn tại không
    const section = await Section.findByPk(section_id);

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    // Lấy danh sách các bài giảng trong phần
    const lectures = await Lecture.findAll({
      where: { section_id },
    });

    res.status(200).json({ message: "OK", lectures });
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailLecture = async (req, res) => {
  const { id } = req.query;

  try {
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.status(200).json({ message: "OK", lecture });
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateLecture = async (req, res) => {
  const { id, section_id, title, description, video_url, duration, position } =
    req.body;

  try {
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Check if the new position is different from the current position
    if (lecture.position !== position) {
      // Update positions of other lectures in the section
      if (lecture.position > position) {
        // If the new position is smaller, shift all the lectures between the old and new position upwards
        await Lecture.update(
          { position: Sequelize.literal("position + 1") },
          {
            where: {
              section_id: lecture.section_id,
              position: {
                [Sequelize.Op.between]: [position, lecture.position - 1],
              },
            },
          }
        );
      } else if (lecture.position < position) {
        // If the new position is larger, shift all the lectures between the old and new position downwards
        await Lecture.update(
          { position: Sequelize.literal("position - 1") },
          {
            where: {
              section_id: lecture.section_id,
              position: {
                [Sequelize.Op.between]: [lecture.position + 1, position],
              },
            },
          }
        );
      }
    }

    // Update the lecture itself
    lecture.section_id = section_id || lecture.section_id;
    lecture.title = title || lecture.title;
    lecture.description = description || lecture.description;
    lecture.video_url = video_url || lecture.video_url;
    lecture.duration = duration || lecture.duration;
    lecture.position = position || lecture.position;

    await lecture.save(); // Save changes

    res.status(200).json({ message: "OK", lecture }); // Return updated lecture
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLecture = async (req, res) => {
  const { id } = req.query;

  try {
    // Find the lecture to delete
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      return res.status(400).json({ error: "Lecture not found" });
    }

    // Find the section associated with the lecture
    const section = await Section.findByPk(lecture.section_id);

    if (!section) {
      return res.status(400).json({ error: "Section not found" });
    }

    // Find all sections that belong to the same course
    const allSectionsInCourse = await Section.findAll({
      where: {
        course_id: section.course_id, // Find sections with the same course_id
      },
    });

    // Extract section IDs
    const sectionIds = allSectionsInCourse.map((sec) => sec.id);

    // Delete the lecture
    await lecture.destroy();

    // Now, update the positions of other lectures across sections in the same course
    const remainingLectures = await Lecture.findAll({
      where: {
        section_id: {
          [Op.in]: sectionIds, // Find lectures in sections of the same course
        },
        position: {
          [Op.gt]: lecture.position, // Find lectures with a position greater than the deleted one
        },
      },
      order: [["position", "ASC"]], // Ensure they are sorted by position
    });

    // Update positions of remaining lectures by decrementing their position by 1
    for (let i = 0; i < remainingLectures.length; i++) {
      remainingLectures[i].position -= 1;
      await remainingLectures[i].save(); // Save the updated position
    }

    res.status(200).send({ message: "OK" });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const deleteLecture = async (req, res) => {
//   const { id } = req.query;

//   try {
//     const lecture = await Lecture.findByPk(id);

//     if (!lecture) {
//       return res.status(400).json({ error: "Lecture not found" });
//     }

//     await lecture.destroy(); // Xóa bài giảng

//     res.status(200).send({ message: "OK" });
//   } catch (error) {
//     console.error("Error deleting lecture:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getAllLecture = async (req, res) => {
  try {
    const lectures = await Lecture.findAll();

    res.status(200).json({ message: "OK", lectures });
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
