import express from "express";
import { readPlayers,addPlayer,updatePlayer,deletePlayer,readPlayerById } from "../controllers/players.controller.js";

const router = express.Router();

router.post("/create", addPlayer);
router.get("/delete", deletePlayer);
router.patch("/update/:playerId", updatePlayer);
router.get("/list-players/:schoolId", readPlayers);
router.get("/get-player/:playerId", readPlayerById);

export default router;

