import express from "express";
import { addRecord,addMultiplesRecords } from "../controllers/records.controller.js";

const router = express.Router();

router.post("/add-record", addRecord);
router.post("/add-multiple-record", addMultiplesRecords);


export default router;