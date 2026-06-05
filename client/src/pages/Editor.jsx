import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePortfolioStore from "../store/portfolioStore";
import api from "../services/api";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import SchemaForm from "../components/editor/SchemaForm";
import TemplatePreview from "../components/editor/TemplatePreview";
import SetupModal from "../components/editor/SetupModal";

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    portfolio,
    template,
    portfolioData,
    isDirty,
    saving,
    lastSaved,
    setPortfolio,
    save,
    reset,
  } = usePortfolioStore();
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [exporting, setExporting] = useState(false);
  const autoSaveRef = useRef(null);

  useEffect(() => {
    loadPortfolio();
    return () => {
      clearInterval(autoSaveRef.current);
      reset();
    };
  }, [id]);

  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      const store = usePortfolioStore.getState();
      if (store.isDirty && !store.saving) {
        store.save().catch(() => {});
      }
    }, 5000);
    return () => clearInterval(autoSaveRef.current);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function loadPortfolio() {
    try {
      const { data } = await api.get(`/portfolios/${id}`);
      setPortfolio(data.portfolio, data.portfolio.templateId);

      const hasData =
        Object.keys(data.portfolio.portfolioData || {}).length > 0;
      if (!hasData) setShowSetup(true);
    } catch {
      toast.error("Portfolio not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  const handleExport = useCallback(async () => {
    if (isDirty) await save();
    setExporting(true);
    try {
      const response = await api.get(`/portfolios/${id}/export`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-portfolio.zip";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Portfolio exported!");
    } catch {
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  }, [id, isDirty, save]);

  const handleSave = useCallback(async () => {
    try {
      await save();
      toast.success("Saved");
    } catch {
      toast.error("Save failed");
    }
  }, [save]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-800 bg-gray-950 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 hover:text-white"
          >
            &larr; Back
          </button>
          <h1 className="text-sm font-semibold text-white">{template?.name}</h1>
          <StatusBadge
            isDirty={isDirty}
            saving={saving}
            lastSaved={lastSaved}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSetup(true)}
            className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            Import JSON
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-30"
          >
            Save
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {exporting ? "Exporting..." : "Export Code"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[440px] flex-shrink-0 overflow-y-auto border-r border-gray-800 bg-gray-950 p-6">
          {template?.schema && <SchemaForm schema={template.schema} />}
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          <TemplatePreview
            templatePath={template?.templatePath}
            data={portfolioData}
          />
        </div>
      </div>

      {showSetup && (
        <SetupModal
          onClose={() => setShowSetup(false)}
          schema={template?.schema}
        />
      )}
    </div>
  );
}

function StatusBadge({ isDirty, saving, lastSaved }) {
  if (saving) {
    return <span className="text-xs text-gray-500">Saving...</span>;
  }
  if (isDirty) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Unsaved changes
      </span>
    );
  }
  if (lastSaved) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Saved
      </span>
    );
  }
  return null;
}
