import express from "express";
import cors from "cors";
import headquartersRoutes from "./routes/headquarters.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoriesRoutes from "./routes/categories.routes.js"
import playersRoutes from "./routes/players.routes.js"
import itemsRoutes from "./routes/items.routes.js"
import assistanceRoutes from "./routes/assistance.routes.js"
import recordsRoutes from "./routes/records.routes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/headquarters", headquartersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/players",playersRoutes );
app.use("/api/items",itemsRoutes );
app.use("/api/assistance",assistanceRoutes );
app.use("/api/records",recordsRoutes );


export default app;



