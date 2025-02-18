import express from "express";
import cors from "cors";
import headquartersRoutes from "./routes/headquarters.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoriesRoutes from "./routes/categories.routes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/headquarters", headquartersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
export default app;

