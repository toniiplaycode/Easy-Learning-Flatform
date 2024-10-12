import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addCart,
  deleteCart,
  getCartEachUser,
} from "../controllers/cartController.js";

let router = express.Router();

router.post("/addCart", authenticateToken, addCart);
router.get("/getCartEachUser", authenticateToken, getCartEachUser);
router.delete("/deleteCart", authenticateToken, deleteCart);

export default router;
