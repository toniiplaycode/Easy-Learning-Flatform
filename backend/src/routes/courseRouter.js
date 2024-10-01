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
