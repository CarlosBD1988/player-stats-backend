import express from "express";
import { addCategories } from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/", addCategories);

export default router;