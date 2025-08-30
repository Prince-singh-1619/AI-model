import { ChevronUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type ModelOption = {
  id: string;
  label: string;
};

const modelOptions: ModelOption[] = [
  { id: "gpt-4", label: "GPT-4" },
  { id: "gpt-3.5", label: "GPT-3.5" },
  { id: "gemini", label: "Gemini" },
  { id: "perplexity", label: "Perplexity" },
  { id: "grok", label: "Grok" },
  { id: "claude", label: "Claude" },
];

const ModelSelector: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // Loading/Error state simulation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  const handleSelect = (model: ModelOption): void => {
    setSelectedModel(model);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("modelChange", { detail: model.id }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          setHighlightedIndex((prev) => (prev + 1) % modelOptions.length);
          e.preventDefault();
          break;
        case "ArrowUp":
          setHighlightedIndex((prev) => (prev - 1 + modelOptions.length) % modelOptions.length);
          e.preventDefault();
          break;
        case "Enter":
        case " ":
          handleSelect(modelOptions[highlightedIndex]);
          e.preventDefault();
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block w-36">
      {/* Dropdown Button */}
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="model-selector-list"
        aria-label="Select AI Model"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="btn w-full flex justify-between items-center px-4 py-2"
      >
        {selectedModel.label}
        <span className="ml-2">
          <ChevronUp />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={listRef}
          id="model-selector-list"
          role="listbox"
          className="absolute bottom-full mb-2 w-full bg-slate-100 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg z-10"
        >
          {loading && (
            <li className="px-4 py-2 text-gray-500" aria-live="polite">
              Loading models...
            </li>
          )}
          {error && (
            <li className="px-4 py-2 text-red-500" aria-live="assertive">
              Failed to load models
            </li>
          )}

          {!loading &&
            !error &&
            modelOptions.map((model, index) => (
              <li
                key={model.id}
                role="option"
                aria-selected={selectedModel.id === model.id}
                onClick={() => handleSelect(model)}
                className={`px-4 py-2 cursor-pointer rounded-lg ${
                  highlightedIndex === index
                    ? "bg-blue-500 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-gray-700"
                }`}
              >
                {model.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ModelSelector;