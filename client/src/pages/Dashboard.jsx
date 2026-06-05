import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Spinner from "../components/common/Spinner";
import api from "../services/api";
import toast from "react-hot-toast";

const tabs = [
  { id: "portfolios", label: "My Portfolios" },
  { id: "templates", label: "Explore Templates" },
  { id: "creator", label: "Template Creator" },
];

const categoryColors = {
  minimal: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  dark: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  creative: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  professional: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  brand: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("portfolios");
  const [portfolios, setPortfolios] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [pRes, tRes] = await Promise.all([
        api.get("/portfolios"),
        api.get("/templates"),
      ]);
      setPortfolios(pRes.data.portfolios);
      setTemplates(tRes.data.templates);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleUseTemplate(templateId) {
    try {
      const { data } = await api.post("/portfolios", { templateId });
      navigate(`/editor/${data.portfolio._id}`);
    } catch {
      toast.error("Failed to create portfolio");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this portfolio?")) return;
    try {
      await api.delete(`/portfolios/${id}`);
      setPortfolios((prev) => prev.filter((p) => p._id !== id));
      toast.success("Portfolio deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex gap-1 rounded-xl border border-gray-800 bg-gray-900 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "portfolios" && (
          <PortfoliosTab
            portfolios={portfolios}
            onDelete={handleDelete}
            onNavigate={(id) => navigate(`/editor/${id}`)}
          />
        )}
        {activeTab === "templates" && (
          <TemplatesTab templates={templates} onUse={handleUseTemplate} />
        )}
        {activeTab === "creator" && <CreatorTab />}
      </div>
    </div>
  );
}

function PortfoliosTab({ portfolios, onDelete, onNavigate }) {
  if (portfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 py-20">
        <div className="mb-4 text-5xl">&#128221;</div>
        <h3 className="mb-2 text-lg font-semibold text-gray-300">
          No portfolios yet
        </h3>
        <p className="text-sm text-gray-500">
          Choose a template to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {portfolios.map((p) => (
        <div
          key={p._id}
          className="group rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-gray-700"
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                p.status === "completed"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-amber-500/20 bg-amber-500/10 text-amber-400"
              }`}
            >
              {p.status}
            </span>
            <button
              onClick={() => onDelete(p._id)}
              className="text-sm text-gray-500 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
          <h3 className="mb-1 font-semibold text-white">
            {p.templateId?.name || "Untitled"}
          </h3>
          <p className="mb-4 text-xs text-gray-500">
            Updated {new Date(p.updatedAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => onNavigate(p._id)}
            className="w-full rounded-lg bg-gray-800 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
          >
            Continue Editing
          </button>
        </div>
      ))}
    </div>
  );
}

function TemplatesTab({ templates, onUse }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((t) => (
        <div
          key={t._id}
          className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-colors hover:border-gray-700"
        >
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-4xl opacity-40">&#9733;</span>
          </div>
          <div className="p-6">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="font-semibold text-white">{t.name}</h3>
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                  categoryColors[t.category] || categoryColors.minimal
                }`}
              >
                {t.category}
              </span>
            </div>
            <p className="mb-4 text-sm text-gray-400">{t.description}</p>
            <button
              onClick={() => onUse(t._id)}
              className="w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Use Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorTab() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 py-20">
      <div className="mb-4 text-5xl">&#128640;</div>
      <h3 className="mb-2 text-xl font-bold text-gray-200">
        Template Creator coming soon
      </h3>
      <p className="max-w-md text-center text-sm text-gray-500">
        Soon developers can create and publish their own portfolio templates.
        Build once, share with the community.
      </p>
    </div>
  );
}
