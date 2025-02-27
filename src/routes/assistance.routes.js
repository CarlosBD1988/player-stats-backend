import express from "express";
import { addAssistance } from "../controllers/matchAttendance.controller.js";

const router = express.Router();

router.post("/register-assistance", addAssistance);



export default router;