import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCertificate,
  deleteCertificate,
  detailCertificate,
  getCertificateAllCourse,
  getCertificateEachCourse,
  getCertificateEachUser,
} from "../controllers/certificateController.js";

let router = express.Router();

router.post("/addCertificate", authenticateToken, addCertificate);

router.get("/getCertificateEachUser", getCertificateEachUser);
router.get("/getCertificateEachCourse", getCertificateEachCourse);
router.get("/getCertificateAllCourse", getCertificateAllCourse);
router.get("/detailCertificate", detailCertificate);
router.delete(
  "/deleteCertificate",
  authenticateToken,
  authorizeRoles("instructor"),
  deleteCertificate
);

export default router;
