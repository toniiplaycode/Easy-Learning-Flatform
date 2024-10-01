import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCategory,
  deleteCategory,
  detailCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";

let router = express.Router();

router.post(
  "/addCategory",
  authenticateToken,
  authorizeRoles("instructor"),
  addCategory
);

router.get("/getAllCategory", getAllCategory);

router.get("/detailCategory", detailCategory);

router.put(
  "/updateCategory",
  authenticateToken,
  authorizeRoles("instructor"),
  updateCategory
);

router.delete(
  "/deleteCategory",
  authenticateToken,
  authorizeRoles("instructor"),
  deleteCategory
);

export default router;
