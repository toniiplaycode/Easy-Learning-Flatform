import { Certificate, Course, Enrollment, User } from "../models/models.js";

export const addCertificate = async (req, res) => {
  let { user_id, course_id, certificate_url } = req.body;

  if (!certificate_url) {
    certificate_url =
      "https://mwcc.edu/wp-content/uploads/2020/09/Google-IT-Professional-Certificate-Logo.png";
  }

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Kiểm tra xem người dùng đã ghi danh vào khóa học hay chưa
    const enrollment = await Enrollment.findOne({
      where: { course_id, user_id, progress: 100 }, // Kiểm tra điều kiện completed
    });

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: "User has not completed this course or not enrolled" });
    }

    // Kiểm tra xem chứng chỉ đã cấp chưa
    const existingCertificate = await Certificate.findOne({
      where: { course_id, user_id },
    });

    if (existingCertificate) {
      return res
        .status(400)
        .json({ error: "Certificate already issued for this user" });
    }

    // Tạo chứng chỉ
    const certificate = await Certificate.create({
      course_id,
      user_id,
      certificate_url,
    });

    res.status(201).json({ message: "OK", certificate });
  } catch (error) {
    console.error("Error issuing certificate:", error);
  }
};

export const getCertificateEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const certificates = await Certificate.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
        },
      ],
    });

    res.status(200).json({ message: "OK", certificates });
  } catch (error) {
    console.error("Error fetching user certificates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCertificateEachCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    const certificates = await Certificate.findAll({
      where: { course_id },
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });

    res.status(200).json({ message: "OK", certificates });
  } catch (error) {
    console.error("Error fetching course certificates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailCertificate = async (req, res) => {
  const { id } = req.query;

  try {
    const certificate = await Certificate.findByPk(id, {
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

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ message: "OK", certificate });
  } catch (error) {
    console.error("Error fetching certificate details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
