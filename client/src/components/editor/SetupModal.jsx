import { useState } from "react";
import usePortfolioStore from "../../store/portfolioStore";
import toast from "react-hot-toast";

export default function SetupModal({ onClose, schema }) {
  const [mode, setMode] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const { setPortfolioData } = usePortfolioStore();

  const flattenIfNested = (data) => {
    if (!schema?.sections) return data;
    const sectionIds = new Set(schema.sections.map((s) => s.id));

    const topKeys = Object.keys(data);
    const isNested =
      topKeys.length > 0 &&
      topKeys.every(
        (k) =>
          sectionIds.has(k) &&
          data[k] !== null &&
          typeof data[k] === "object" &&
          !Array.isArray(data[k]),
      );
    if (!isNested) return data;

    const flat = {};
    for (const section of schema.sections) {
      const sectionData = data[section.id];
      if (!sectionData || typeof sectionData !== "object") continue;
      for (const field of section.fields) {
        if (field.key in sectionData) {
          flat[field.key] = sectionData[field.key];
        }
      }
    }
    return flat;
  };

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        toast.error("JSON must be an object");
        return;
      }
      setPortfolioData(flattenIfNested(parsed));
      toast.success("Data imported");
      onClose();
    } catch {
      toast.error("Invalid JSON");
    }
  };

  const handleFillManually = () => {
    onClose();
  };

  if (!mode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <h2 className="mb-2 text-xl font-bold text-white">
            Set Up Your Portfolio
          </h2>
          <p className="mb-8 text-sm text-gray-400">
            Choose how you'd like to start filling your portfolio data.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setMode("json")}
              className="w-full rounded-xl border border-gray-700 p-4 text-left transition-colors hover:border-brand-500 hover:bg-gray-800"
            >
              <h3 className="font-semibold text-white">Upload JSON</h3>
              <p className="mt-1 text-sm text-gray-400">
                Paste your portfolio data as JSON to auto-fill all fields.
              </p>
            </button>
            <button
              onClick={handleFillManually}
              className="w-full rounded-xl border border-gray-700 p-4 text-left transition-colors hover:border-brand-500 hover:bg-gray-800"
            >
              <h3 className="font-semibold text-white">Fill Manually</h3>
              <p className="mt-1 text-sm text-gray-400">
                Use the form editor to fill in your details section by section.
              </p>
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-white"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-8">
        <h2 className="mb-2 text-xl font-bold text-white">Import JSON Data</h2>
        <p className="mb-4 text-sm text-gray-400">
          Paste your portfolio data. It should match the template's schema
          structure.
        </p>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          rows={12}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-mono text-sm text-white outline-none focus:border-brand-500"
          placeholder={`{\n  "hero": {\n    "name": "Your Name",\n    "role": "Software Engineer"\n  }\n}`}
        />
        {schema && (
          <details className="mt-3">
            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-300">
              View expected schema keys
            </summary>
            <div className="mt-2 rounded-lg bg-gray-800 p-3 font-mono text-xs text-gray-400">
              {schema.sections?.map((s) => (
                <div key={s.id} className="mb-1">
                  <span className="text-brand-400">{s.id}</span>: {"{"}
                  {s.fields.map((f) => f.key).join(", ")}
                  {"}"}
                </div>
              ))}
            </div>
          </details>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleJsonImport}
            className="flex-1 rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            Import
          </button>
          <button
            onClick={() => setMode(null)}
            className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm text-gray-400 hover:bg-gray-800"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
