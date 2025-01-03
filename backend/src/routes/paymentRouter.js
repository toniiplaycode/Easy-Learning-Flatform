import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addPayment,
  detailPayment,
  getAllPaymentAllCourse,
  getAllPaymentEachCourse,
  getAllPaymentEachUser,
  verifyPaymentPaypal,
} from "../controllers/paymentController.js";

let router = express.Router();

router.post("/addPayment", authenticateToken, addPayment);
router.get("/verifyPaymentPaypal", verifyPaymentPaypal);
router.get("/detailPayment", authenticateToken, detailPayment);
router.get("/getAllPaymentEachUser", authenticateToken, getAllPaymentEachUser);
router.get(
  "/getAllPaymentEachCourse",
  authenticateToken,
  getAllPaymentEachCourse
);

router.get(
  "/getAllPaymentAllCourse",
  authenticateToken,
  authorizeRoles("instructor"),
  getAllPaymentAllCourse
);

export default router;
