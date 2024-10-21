import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCourse,
  deleteCourse,
  detailCourse,
  getAllCourse,
  getAllCourseWithCoupon,
  getCourseInstructor,
  updateCourse,
} from "../controllers/courseController.js";

let router = express.Router();

router.post(
  "/addCourse",
  authenticateToken,
  authorizeRoles("instructor"),
  addCourse
);

router.get("/getAllCourse", getAllCourse);

router.get("/getAllCourseWithCoupon", getAllCourseWithCoupon);

router.get("/getCourseInstructor", getCourseInstructor); // lấy khóa học theo người hướng dẫn

router.get("/detailCourse", detailCourse);

router.put(
  "/updateCourse",
  authenticateToken,
  authorizeRoles("instructor", "admin"),
  updateCourse
);

router.delete(
  "/deleteCourse",
  authenticateToken,
  authorizeRoles("instructor", "admin"),
  deleteCourse
);

export default router;
