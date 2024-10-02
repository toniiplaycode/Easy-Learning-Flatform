import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addEnrollment,
  deleteEnrollment,
  detailEnrollment,
  getEnrollmentAllUser,
  getEnrollmentEachUser,
} from "../controllers/enrollmentController.js";

let router = express.Router();

router.post("/addEnrollment", authenticateToken, addEnrollment);
router.get("/getEnrollmentEachUser", authenticateToken, getEnrollmentEachUser); //Lấy danh sách các khóa học mà người dùng đã ghi danh
router.get("/getEnrollmentAllUser", getEnrollmentAllUser); //Lấy danh sách người học đã ghi danh vào một khóa học
router.get("/detailEnrollment", authenticateToken, detailEnrollment);
router.delete("/deleteEnrollment", authenticateToken, deleteEnrollment);

export default router;
