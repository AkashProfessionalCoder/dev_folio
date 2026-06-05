import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import templateRoutes from "./routes/template.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/portfolios", portfolioRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/devfolio-forge",
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
