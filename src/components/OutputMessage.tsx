import React, { useState } from "react";
import { Copy, Download, Loader2, AlertCircle } from "lucide-react";
import type { AIParams } from "../App";

type OutputMessageProps = {
  id: string;
  text: string;
  params?: AIParams;
};

const OutputMessage: React.FC<OutputMessageProps> = ({ id, text, params }) => {
  const [loading, setLoading] = useState<"copy" | "download" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    setError(null);
    setLoading("copy");
    try {
      await navigator.clipboard.writeText(text);
      setLoading(null);
    } catch (err) {
      console.error("Failed to copy", err);
      setError("Failed to copy text.");
      setLoading(null);
    }
  };

  const handleDownload = () => {
    setError(null);
    setLoading("download");
    try {
      const data = { id, text, params, timestamp: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `output-${id}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setLoading(null);
    } catch (err) {
      console.error("Download failed", err);
      setError("Download failed.");
      setLoading(null);
    }
  };

  return (
    <div
      className="p-4 flex flex-col justify-between rounded-xl shadow-sm bg-slate-100 dark:bg-black/10 mb-4"
      role="region"
      aria-label="AI output message"
    >
      {/* Message content */}
      <p className="whitespace-pre-wrap text-left mb-2 ">{text}</p>

      {/* Parameters used */}
      {params && (
        <div
          className="text-xs text-gray-500 dark:text-gray-400 mb-2"
          aria-label={`Parameters used: Temperature ${params.temperature}, Max Tokens ${params.maxTokens}, Top P ${params.topP.toFixed(
            2
          )}`}
        >
          Temp: {params.temperature} | Tokens: {params.maxTokens} | Top-P:{" "}
          {params.topP.toFixed(2)}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="flex items-center text-sm text-red-500 mb-2"
          role="alert"
        >
          <AlertCircle className="mr-1" size={16} /> {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          disabled={loading === "copy"}
          aria-label="Copy message to clipboard"
          className="btn flex items-center gap-1 disabled:opacity-50"
        >
          {loading === "copy" ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={loading === "download"}
          aria-label="Download message as JSON"
          className="btn flex items-center gap-1 disabled:opacity-50"
        >
          {loading === "download" ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Download size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default OutputMessage;