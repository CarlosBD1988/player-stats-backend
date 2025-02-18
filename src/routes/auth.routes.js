import express from "express";
import { loginUser,createUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/create-user", createUser);

export default router;
