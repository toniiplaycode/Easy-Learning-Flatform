import { Lecture, Section } from "../models/models.js";

export const addLecture = async (req, res) => {
  const { section_id, title, description, video_url, duration, position } =
    req.body;

  try {
    // Kiểm tra xem phần này có tồn tại không
    const section = await Section.findByPk(section_id);

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    if (!title || !description || !video_url || !duration || !position) {
      return res.status(404).json({
        error:
          "title, video_url, description, duration and position is requered",
      });
    }

    // Tạo một bài giảng mới
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
  const { id, section_id, title, video_url, duration, position } = req.body;

  try {
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Cập nhật bài giảng
    lecture.section_id = section_id || lecture.section_id;
    lecture.title = title || lecture.title;
    lecture.video_url = video_url || lecture.video_url;
    lecture.duration = duration || lecture.duration;
    lecture.position = position || lecture.position;

    await lecture.save(); // Lưu các thay đổi

    res.status(200).json({ message: "OK", lecture }); // Trả về bài giảng đã cập nhật
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLecture = async (req, res) => {
  const { id } = req.query;

  try {
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    await lecture.destroy(); // Xóa bài giảng

    res.status(200).send({ message: "OK" });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
