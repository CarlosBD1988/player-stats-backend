import express from "express";
import { addPlayer,updatePlayer,deletePlayer } from "../controllers/players.controller.js";

const router = express.Router();

router.post("/create", addPlayer);
router.post("/delete", deletePlayer);
router.post("/update", updatePlayer);

export default router;
