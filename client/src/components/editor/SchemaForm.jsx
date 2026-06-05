import usePortfolioStore from "../../store/portfolioStore";

export default function SchemaForm({ schema }) {
  if (!schema?.sections) return null;

  return (
    <div className="space-y-8">
      {schema.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

function SectionRenderer({ section }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        {section.label}
      </h3>
      <div className="space-y-4">
        {section.fields.map((field) => (
          <FieldRenderer key={field.key} field={field} sectionId={section.id} />
        ))}
      </div>
    </div>
  );
}

function FieldRenderer({ field, sectionId }) {
  switch (field.type) {
    case "text":
    case "url":
      return <TextField field={field} />;
    case "textarea":
      return <TextareaField field={field} />;
    case "image":
      return <TextField field={field} />;
    case "array":
      return <ArrayField field={field} />;
    case "objectList":
      return <ObjectListField field={field} />;
    default:
      return <TextField field={field} />;
  }
}

function TextField({ field }) {
  const { portfolioData, updateSectionData } = usePortfolioStore();
  const value = portfolioData[field.key] || "";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">
        {field.label}
        {field.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type={field.type === "url" ? "url" : "text"}
        value={value}
        onChange={(e) => updateSectionData(field.key, e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-brand-500"
        placeholder={field.label}
      />
    </div>
  );
}

function TextareaField({ field }) {
  const { portfolioData, updateSectionData } = usePortfolioStore();
  const value = portfolioData[field.key] || "";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">
        {field.label}
        {field.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => updateSectionData(field.key, e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-brand-500"
        placeholder={field.label}
      />
    </div>
  );
}

function ArrayField({ field }) {
  const { portfolioData, updateSectionData } = usePortfolioStore();
  const raw = portfolioData[field.key];
  const items = Array.isArray(raw) ? raw : [];

  const addItem = () => updateSectionData(field.key, [...items, ""]);
  const removeItem = (index) =>
    updateSectionData(
      field.key,
      items.filter((_, i) => i !== index),
    );
  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    updateSectionData(field.key, updated);
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">
        {field.label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              placeholder={`${field.label} ${i + 1}`}
            />
            <button
              onClick={() => removeItem(i)}
              className="rounded-lg border border-gray-700 px-2.5 text-gray-500 hover:border-red-500/50 hover:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="mt-2 rounded-lg border border-dashed border-gray-700 px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-brand-500 hover:text-brand-400"
      >
        + Add {field.label}
      </button>
    </div>
  );
}

function ObjectListField({ field }) {
  const { portfolioData, updateSectionData } = usePortfolioStore();
  const raw = portfolioData[field.key];
  const items = Array.isArray(raw) ? raw : [];

  const addItem = () => {
    const empty = {};
    field.fields.forEach((f) => {
      empty[f.key] = f.type === "array" ? [] : "";
    });
    updateSectionData(field.key, [...items, empty]);
  };

  const removeItem = (index) => {
    updateSectionData(
      field.key,
      items.filter((_, i) => i !== index),
    );
  };

  const updateItem = (index, key, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    updateSectionData(field.key, updated);
  };

  const updateNestedArray = (itemIndex, key, arrIndex, value) => {
    const updated = items.map((item, i) => {
      if (i !== itemIndex) return item;
      const arr = [...(item[key] || [])];
      arr[arrIndex] = value;
      return { ...item, [key]: arr };
    });
    updateSectionData(field.key, updated);
  };

  const addNestedArrayItem = (itemIndex, key) => {
    const updated = items.map((item, i) => {
      if (i !== itemIndex) return item;
      return { ...item, [key]: [...(item[key] || []), ""] };
    });
    updateSectionData(field.key, updated);
  };

  const removeNestedArrayItem = (itemIndex, key, arrIndex) => {
    const updated = items.map((item, i) => {
      if (i !== itemIndex) return item;
      return {
        ...item,
        [key]: (item[key] || []).filter((_, j) => j !== arrIndex),
      };
    });
    updateSectionData(field.key, updated);
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        {field.label}
      </label>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-800 bg-gray-900/50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                {field.label} {i + 1}
              </span>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-gray-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              {field.fields.map((subField) => {
                if (subField.type === "array") {
                  const nestedItems = item[subField.key] || [];
                  return (
                    <div key={subField.key}>
                      <label className="mb-1 block text-xs text-gray-500">
                        {subField.label}
                      </label>
                      <div className="space-y-2">
                        {nestedItems.map((nestedItem, j) => (
                          <div key={j} className="flex gap-2">
                            <input
                              type="text"
                              value={nestedItem}
                              onChange={(e) =>
                                updateNestedArray(
                                  i,
                                  subField.key,
                                  j,
                                  e.target.value,
                                )
                              }
                              className="flex-1 rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-white outline-none focus:border-brand-500"
                            />
                            <button
                              onClick={() =>
                                removeNestedArrayItem(i, subField.key, j)
                              }
                              className="text-xs text-gray-500 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addNestedArrayItem(i, subField.key)}
                        className="mt-1 text-xs text-gray-500 hover:text-brand-400"
                      >
                        + Add
                      </button>
                    </div>
                  );
                }

                if (subField.type === "textarea") {
                  return (
                    <div key={subField.key}>
                      <label className="mb-1 block text-xs text-gray-500">
                        {subField.label}
                        {subField.required && (
                          <span className="ml-1 text-red-400">*</span>
                        )}
                      </label>
                      <textarea
                        value={item[subField.key] || ""}
                        onChange={(e) =>
                          updateItem(i, subField.key, e.target.value)
                        }
                        rows={2}
                        className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-white outline-none focus:border-brand-500"
                      />
                    </div>
                  );
                }

                return (
                  <div key={subField.key}>
                    <label className="mb-1 block text-xs text-gray-500">
                      {subField.label}
                      {subField.required && (
                        <span className="ml-1 text-red-400">*</span>
                      )}
                    </label>
                    <input
                      type={subField.type === "url" ? "url" : "text"}
                      value={item[subField.key] || ""}
                      onChange={(e) =>
                        updateItem(i, subField.key, e.target.value)
                      }
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-white outline-none focus:border-brand-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="mt-3 w-full rounded-lg border border-dashed border-gray-700 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:border-brand-500 hover:text-brand-400"
      >
        + Add {field.label}
      </button>
    </div>
  );
}
