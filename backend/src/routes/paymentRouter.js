import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addPayment,
  detailPayment,
  getAllPaymentEachCourse,
  getAllPaymentEachUser,
} from "../controllers/paymentController.js";

let router = express.Router();

router.post("/addPayment", authenticateToken, addPayment);
router.get("/detailPayment", authenticateToken, detailPayment);
router.get("/getAllPaymentEachUser", authenticateToken, getAllPaymentEachUser);
router.get(
  "/getAllPaymentEachCourse",
  authenticateToken,
  getAllPaymentEachCourse
);

export default router;
