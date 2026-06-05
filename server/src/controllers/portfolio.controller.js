import Portfolio from "../models/Portfolio.js";

export async function createPortfolio(req, res) {
  try {
    const portfolio = await Portfolio.create({
      userId: req.user._id,
      templateId: req.body.templateId,
      portfolioData: req.body.portfolioData || {},
      status: "draft",
    });
    res.status(201).json({ portfolio });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getMyPortfolios(req, res) {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id })
      .populate("templateId", "name category previewImage")
      .sort({ updatedAt: -1 });
    res.json({ portfolios });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getPortfolioById(req, res) {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("templateId");
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });
    res.json({ portfolio });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updatePortfolio(req, res) {
  try {
    const updates = {};
    if (req.body.portfolioData !== undefined)
      updates.portfolioData = req.body.portfolioData;
    if (req.body.status) updates.status = req.body.status;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true },
    );
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });
    res.json({ portfolio });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deletePortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });
    res.json({ message: "Portfolio deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
