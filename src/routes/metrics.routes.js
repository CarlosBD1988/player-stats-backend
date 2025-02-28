import express from "express";
import { addMetric,readMetric } from "../controllers/metrics.controller.js";

const router = express.Router();

router.post("/add-metric", addMetric);
router.post("/read-metric", readMetric);


export default router;