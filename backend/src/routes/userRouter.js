import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
let router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

export default router;
