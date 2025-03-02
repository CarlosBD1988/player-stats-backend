import express from "express";
import { readPlayers,addPlayer,updatePlayer,deletePlayer } from "../controllers/players.controller.js";

const router = express.Router();

router.post("/create", addPlayer);
router.get("/delete", deletePlayer);
router.post("/update", updatePlayer);
router.get("/list-players/:schoolId", readPlayers);


export default router;
