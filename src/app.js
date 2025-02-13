import express from "express";
import cors from "cors";
import headquartersRoutes from "./routes/headquarters.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/headquarters", headquartersRoutes);

export default app;
