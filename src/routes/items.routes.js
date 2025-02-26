import express from "express";
import { addItem } from "../controllers/items.controller.js";

const router = express.Router();

router.post("/create", addItem);



export default router;
