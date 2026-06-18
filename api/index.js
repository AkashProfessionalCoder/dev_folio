import app, { connectDB } from "../server/src/server.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error("Serverless handler error:", err);
    return res.status(500).json({ message: "Serverless handler error", error: err.message });
  }
}
