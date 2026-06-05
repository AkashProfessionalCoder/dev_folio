import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import templateRoutes from "./routes/template.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/portfolios", portfolioRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/devfolio-forge",
  );
  isConnected = true;
  console.log("Connected to MongoDB");
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

export default app;
