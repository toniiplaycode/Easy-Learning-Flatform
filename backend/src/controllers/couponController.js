import { Coupon, Course } from "../models/models.js";

export const addCoupon = async (req, res) => {
  const { course_id, code, discount_percentage, valid_until } = req.body;

  try {
    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.instructor_id !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Are you not instructor this course" });
    }

    const existingCoupon = await Coupon.findOne({
      where: { course_id, code },
    });

    if (existingCoupon) {
      return res.status(404).json({ error: "coupon was existing" });
    }

    // Tạo phiếu giảm giá
    const coupon = await Coupon.create({
      course_id,
      code,
      discount_percentage,
      valid_until,
    });

    res.status(201).json({ message: "OK", coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCouponEachCourse = async (req, res) => {
  const { course_id } = req.query;

  const course = await Course.findOne({ where: { id: course_id } });

  if (course.instructor_id !== req.user.id) {
    return res
      .status(404)
      .json({ error: "Are you not instructor this course" });
  }

  try {
    const coupons = await Coupon.findAll({
      where: { course_id },
    });

    res.status(200).json({ message: "OK", coupons });
  } catch (error) {
    console.error("Error fetching coupons for course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const detailCoupon = async (req, res) => {
  const { id } = req.query;

  try {
    const coupon = await Coupon.findByPk(id, {
      include: {
        model: Course,
      },
    });

    if (coupon.Course.instructor_id !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Are you not instructor this course" });
    }

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    res.status(200).json({ message: "OK", coupon });
  } catch (error) {
    console.error("Error fetching coupon details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCoupon = async (req, res) => {
  let { id, code, discount_percentage, valid_until } = req.body;

  try {
    const coupon = await Coupon.findByPk(id, {
      include: {
        model: Course,
      },
    });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.Course.instructor_id !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Are you not instructor this course" });
    }

    coupon.code = code || coupon.code;
    coupon.discount_percentage =
      discount_percentage || coupon.discount_percentage;
    coupon.valid_until = valid_until || coupon.valid_until;

    await coupon.save();

    res.status(200).json({ message: "OK", coupon });
  } catch (error) {
    console.error("Error fetching coupon details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCoupon = async (req, res) => {
  let { id } = req.query;

  try {
    const coupon = await Coupon.findByPk(id, {
      include: {
        model: Course,
      },
    });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.Course.instructor_id !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Are you not instructor this course" });
    }

    await coupon.destroy();

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error fetching coupon details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();

    if (!coupons) {
      return res.status(400).json({ error: "not some coupons !" });
    }

    res.status(200).json({ message: "OK", coupons });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
