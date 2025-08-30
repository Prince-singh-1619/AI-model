import React, { useState, useEffect } from "react";

type PromptTemplate = {
  id: string;
  title: string;
  content: string;
};

const PromptTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [activePrompt, setActivePrompt] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load templates from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("promptTemplates");
      if (saved) {
        setTemplates(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading templates", err);
      setError("Failed to load saved templates.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Save templates whenever updated
  useEffect(() => {
    try {
      localStorage.setItem("promptTemplates", JSON.stringify(templates));
    } catch (err) {
      console.error("Error saving templates", err);
      setError("Failed to save templates.");
    }
  }, [templates]);

  const addTemplate = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError("Both title and content are required.");
      return;
    }

    const newTemplate: PromptTemplate = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
    };

    setTemplates((prev) => [...prev, newTemplate]);
    setNewTitle("");
    setNewContent("");
    setError(null);
  };

  const loadTemplate = (template: PromptTemplate) => {
    setActivePrompt(template.content);

    // Optional: trigger an event so parent components can use this
    window.dispatchEvent(new CustomEvent("promptLoaded", { detail: template.content }));
  };

  return (
    <div
      className="p-4 border rounded-2xl shadow bg-slate-100 dark:bg-black/10 w-full max-w-lg"
      aria-labelledby="prompt-templates-heading"
    >
      <h2 id="prompt-templates-heading" className="text-xl font-semibold mb-4">
        Prompt Templates
      </h2>

      {/* Loading/Error states */}
      {loading && <p className="text-gray-500">Loading templates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Input for new template */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          aria-label="Template Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Template title"
          className="w-full px-3 py-2 border rounded-lg input-field"
        />
        <textarea
          aria-label="Template Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Template content"
          className="w-full px-3 py-2 border rounded-lg input-field"
          rows={3}
        />
        <button
          onClick={addTemplate}
          className="btn"
          aria-label="Save template"
        >
          Save Template
        </button>
      </div>

      {/* List of templates */}
      <div className="space-y-2" aria-live="polite">
        {templates.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No saved prompts yet.
          </p>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="flex justify-between items-center p-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800"
            >
              <span className="text-gray-800 dark:text-gray-200">{template.title}</span>
              <button
                onClick={() => loadTemplate(template)}
                className="btn"
                aria-label={`Load template ${template.title}`}
              >
                Load
              </button>
            </div>
          ))
        )}
      </div>

      {/* Active Prompt Preview */}
      {activePrompt && (
        <div
          className="mt-4 p-3 border rounded-lg bg-slate-100 dark:bg-black/10"
          aria-live="polite"
        >
          <h3 className="font-medium mb-2">Loaded Prompt</h3>
          <p className="whitespace-pre-wrap">{activePrompt}</p>
        </div>
      )}
    </div>
  );
};

export default PromptTemplates;