import express from "express";
import { addMetric,readMetricByPlayer } from "../controllers/metrics.controller.js";

const router = express.Router();

router.post("/add-metric", addMetric);
router.get("/read-metric/:playerId", readMetricByPlayer);


export default router;