import Portfolio from "../models/Portfolio.js";
import { generateExport } from "../services/export.service.js";

export async function exportPortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("templateId");

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const zipBuffer = await generateExport(portfolio);

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="my-portfolio.zip"`,
      "Content-Length": zipBuffer.length,
    });
    res.send(zipBuffer);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Export failed" });
  }
}
