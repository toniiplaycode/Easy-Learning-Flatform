import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCertificate,
  detailCertificate,
  getCertificateEachCourse,
  getCertificateEachUser,
} from "../controllers/certificateController.js";

let router = express.Router();

router.post(
  "/addCertificate",
  authenticateToken,
  authorizeRoles("instructor"),
  addCertificate
);

router.get("/getCertificateEachUser", getCertificateEachUser);
router.get("/getCertificateEachCourse", getCertificateEachCourse);
router.get("/detailCertificate", detailCertificate);

export default router;
