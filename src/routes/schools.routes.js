import express from "express";
import { readSchools} from "../controllers/schooll.controller.js";

const router = express.Router();

router.post("/list-schools/", readSchools);


export default router;