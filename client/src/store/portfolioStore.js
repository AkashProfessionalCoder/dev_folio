import { create } from "zustand";
import api from "../services/api";

const usePortfolioStore = create((set, get) => ({
  portfolio: null,
  template: null,
  portfolioData: {},
  isDirty: false,
  saving: false,
  lastSaved: null,

  setPortfolio: (portfolio, template) => {
    set({
      portfolio,
      template,
      portfolioData: portfolio.portfolioData || {},
      isDirty: false,
    });
  },

  updateField: (sectionId, key, value) => {
    const current = get().portfolioData;
    set({
      portfolioData: { ...current, [key]: value },
      isDirty: true,
    });
  },

  updateSectionData: (key, value) => {
    const current = get().portfolioData;
    set({
      portfolioData: { ...current, [key]: value },
      isDirty: true,
    });
  },

  setPortfolioData: (data) => {
    set({ portfolioData: data, isDirty: true });
  },

  save: async () => {
    const { portfolio, portfolioData } = get();
    if (!portfolio) return;
    set({ saving: true });
    try {
      await api.patch(`/portfolios/${portfolio._id}`, { portfolioData });
      set({ isDirty: false, saving: false, lastSaved: new Date() });
    } catch {
      set({ saving: false });
      throw new Error("Save failed");
    }
  },

  reset: () => {
    set({
      portfolio: null,
      template: null,
      portfolioData: {},
      isDirty: false,
      saving: false,
      lastSaved: null,
    });
  },
}));

export default usePortfolioStore;
