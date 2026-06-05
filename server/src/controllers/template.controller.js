import Template from "../models/Template.js";

export async function getTemplates(req, res) {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json({ templates });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getTemplateById(req, res) {
  try {
    const template = await Template.findById(req.params.id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });
    res.json({ template });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
