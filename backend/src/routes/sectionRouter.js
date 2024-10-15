import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addSection,
  deleteSection,
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
