import express from "express";
import {
  loginUser,
  registerUser,
  detailUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
let router = express.Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/detailUser", authenticateToken, detailUser);

router.get(
  "/getAllUsers",
  authenticateToken,
  authorizeRoles("admin"),
  getAllUsers
);

router.put("/updateUser", authenticateToken, updateUser);

router.delete("/deleteUser", authenticateToken, deleteUser);

export default router;
