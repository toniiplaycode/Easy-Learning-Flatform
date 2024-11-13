import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addPaymentMethod,
  deletePaymentMethod,
  getAllPaymentMethod,
} from "../controllers/paymentMethodController.js";

let router = express.Router();

router.get("/getAllPaymentMethod", getAllPaymentMethod);
router.post(
  "/addPaymentMethod",
  authenticateToken,
  authorizeRoles("admin"),
  addPaymentMethod
);
router.delete(
  "/deletePaymentMethod",
  authenticateToken,
  authorizeRoles("admin"),
  deletePaymentMethod
);

export default router;
