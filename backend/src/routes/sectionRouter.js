import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addSection,
  deleteSection,
  getSectionAllLectureEachCourse,
  getSectionEachCourse,
  updateSection,
} from "../controllers/sectionController.js";

let router = express.Router();

router.post(
  "/addSection",
  authenticateToken,
  authorizeRoles("instructor"),
  addSection
);

router.get("/getSectionEachCourse", getSectionEachCourse);

router.get("/getSectionAllLectureEachCourse", getSectionAllLectureEachCourse);

router.put(
  "/updateSection",
  authenticateToken,
  authorizeRoles("instructor"),
  updateSection
);

router.delete(
  "/deleteSection",
  authenticateToken,
  authorizeRoles("instructor"),
  deleteSection
);

export default router;
