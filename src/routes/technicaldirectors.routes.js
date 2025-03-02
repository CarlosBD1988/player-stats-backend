import express from "express";
import { addTechnical } from "../controllers/technicaldirectors.controllers.js";

const router = express.Router();

router.post("/create", addTechnical);

export default router;