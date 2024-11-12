import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addLecture,
  deleteLecture,
  detailLecture,
  getAllLecture,
  getLectureSection,
  updateLecture,
} from "../controllers/lectureController.js";

let router = express.Router();

router.post(
  "/addLecture",
  authenticateToken,
  authorizeRoles("instructor"),
  addLecture
);

router.get(
  "/getLectureSection",
  authenticateToken,
  authorizeRoles("instructor"),
  getLectureSection
);

router.get(
  "/detailLecture",
  authenticateToken,
  authorizeRoles("instructor"),
  detailLecture
);

router.put(
  "/updateLecture",
  authenticateToken,
  authorizeRoles("instructor"),
  updateLecture
);

router.delete(
  "/deleteLecture",
  authenticateToken,
  authorizeRoles("instructor"),
  deleteLecture
);

router.get("/getAllLecture", getAllLecture);

export default router;
