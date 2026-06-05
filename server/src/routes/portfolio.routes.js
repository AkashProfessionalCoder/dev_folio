import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createPortfolio,
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";
import { exportPortfolio } from "../controllers/export.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", createPortfolio);
router.get("/", getMyPortfolios);
router.get("/:id", getPortfolioById);
router.patch("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);
router.get("/:id/export", exportPortfolio);

export default router;
