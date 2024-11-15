import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addPaymentMethod,
  deletePaymentMethod,
  getAllPaymentMethod,
  updatePaymentMethod,
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
router.put(
  "/updatePaymentMethod",
  authenticateToken,
  authorizeRoles("admin"),
  updatePaymentMethod
);

export default router;
