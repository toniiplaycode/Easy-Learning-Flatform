import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCoupon,
  deleteCoupon,
  detailCoupon,
  getAllCoupon,
  getCouponEachCourse,
  updateCoupon,
} from "../controllers/couponController.js";

let router = express.Router();

router.post(
  "/addCoupon",
  authenticateToken,
  authorizeRoles("instructor"),
  addCoupon
);

router.get(
  "/getCouponEachCourse",
  authenticateToken,
  authorizeRoles("instructor"),
  getCouponEachCourse
);

router.get(
  "/detailCoupon",
  authenticateToken,
  authorizeRoles("instructor"),
  detailCoupon
);

router.put(
  "/updateCoupon",
  authenticateToken,
  authorizeRoles("instructor"),
  updateCoupon
);

router.delete(
  "/deleteCoupon",
  authenticateToken,
  authorizeRoles("instructor"),
  deleteCoupon
);

router.get("/getAllCoupon", getAllCoupon);

export default router;
