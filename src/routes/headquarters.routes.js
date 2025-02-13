import express from "express";
import { addHeadquarters } from "../controllers/headquarters.controller.js";

const router = express.Router();

router.post("/", addHeadquarters);

export default router;
