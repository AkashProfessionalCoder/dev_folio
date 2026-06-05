import app, { connectDB } from "../server/src/server.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ message: "DB connection failed", error: err.message });
  }
  return app(req, res);
}
