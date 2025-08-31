import React from "react";
import { Copy, Download } from "lucide-react";

export type Parameters = {
  temperature: number;
  maxTokens: number;
  topP: number;
};

export type ChatBubbleProps = {
  isUser: boolean;
  message: string;
  params?: Parameters; // only present for assistant
  error?: string;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isUser,
  message,
  params,
  error,
}) => {
  const handleCopy = () => {
    if (params) {
      navigator.clipboard.writeText(JSON.stringify(params, null, 2));
    }
  };

  const handleDownload = () => {
    if (params) {
      const blob = new Blob([JSON.stringify(params, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "params.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`flex w-full mb-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] p-3 rounded-2xl shadow ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none mr-2"
            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message}</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

        {/* Show params and buttons only if assistant */}
        {!isUser && params && (
          <div>
            <div className="mt-3 border-t border-gray-300 dark:border-gray-600 pt-2 text-xs flex gap-2">
              <p>
                <strong>Temp:</strong> {params.temperature}
              </p>
              <p>
                <strong>Max Tokens:</strong> {params.maxTokens}
              </p>
              <p>
                <strong>Top P:</strong> {params.topP}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCopy}
                className="flex items-center px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500"
              >
                <Copy size={14} className="mr-1" />
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500"
              >
                <Download size={14} className="mr-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};