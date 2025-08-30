import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

type Parameters = {
  temperature: number;
  maxTokens: number;
  topP: number;
};

const ParameterControls: React.FC = () => {
  const [params, setParams] = useState<Parameters>({
    temperature: 0.7,
    maxTokens: 500,
    topP: 1,
  });

  const [loading, setLoading] = useState<keyof Parameters | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof Parameters, value: number) => {
    setError(null);
    setLoading(key);

    try {
      const newParams = { ...params, [key]: value };
      setParams(newParams);

      // Broadcast params to other components
      window.dispatchEvent(
        new CustomEvent("paramsChanged", { detail: newParams })
      );

      setLoading(null);
    } catch (err) {
      console.error("Failed to update parameter", err);
      setError(`Failed to update ${key}`);
      setLoading(null);
    }
  };

  return (
    <div
      className="p-4 border rounded-2xl shadow bg-slate-100 dark:bg-black/10 w-full max-w-lg"
      role="region"
      aria-label="AI Parameter Controls"
    >
      <h2 className="text-xl font-semibold mb-4">Parameter Controls</h2>

      {error && (
        <div
          className="flex items-center text-sm text-red-500 mb-2"
          role="alert"
        >
          <AlertCircle className="mr-1" size={16} /> {error}
        </div>
      )}

      {/* Temperature */}
      <div className="mb-4">
        <label
          htmlFor="temperature-slider"
          className="flex justify-between text-sm mb-1"
        >
          <span>Temperature</span>
          <span>
            {loading === "temperature" ? (
              <Loader2
                size={14}
                className="animate-spin inline"
                aria-hidden="true"
              />
            ) : (
              params.temperature.toFixed(2)
            )}
          </span>
        </label>
        <input
          id="temperature-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={params.temperature}
          onChange={(e) =>
            handleChange("temperature", parseFloat(e.target.value))
          }
          className="w-full"
          aria-label="Adjust temperature"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={params.temperature}
          aria-describedby="temperature-desc"
        />
        <p id="temperature-desc" className="text-xs text-gray-500">
          Controls randomness (0 = deterministic, 1 = creative).
        </p>
      </div>

      {/* Max Tokens */}
      <div className="mb-4">
        <label
          htmlFor="maxTokens-slider"
          className="flex justify-between text-sm mb-1"
        >
          <span>Max Tokens</span>
          <span>
            {loading === "maxTokens" ? (
              <Loader2
                size={14}
                className="animate-spin inline"
                aria-hidden="true"
              />
            ) : (
              params.maxTokens
            )}
          </span>
        </label>
        <input
          id="maxTokens-slider"
          type="range"
          min={50}
          max={4000}
          step={50}
          value={params.maxTokens}
          onChange={(e) => handleChange("maxTokens", parseInt(e.target.value))}
          className="w-full"
          aria-label="Adjust maximum tokens"
          aria-valuemin={50}
          aria-valuemax={4000}
          aria-valuenow={params.maxTokens}
          aria-describedby="tokens-desc"
        />
        <p id="tokens-desc" className="text-xs text-gray-500">
          Controls the maximum length of the response.
        </p>
      </div>

      {/* Top P */}
      <div className="mb-4">
        <label
          htmlFor="topP-slider"
          className="flex justify-between text-sm mb-1"
        >
          <span>Top P</span>
          <span>
            {loading === "topP" ? (
              <Loader2
                size={14}
                className="animate-spin inline"
                aria-hidden="true"
              />
            ) : (
              params.topP.toFixed(2)
            )}
          </span>
        </label>
        <input
          id="topP-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={params.topP}
          onChange={(e) => handleChange("topP", parseFloat(e.target.value))}
          className="w-full"
          aria-label="Adjust top-p sampling"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={params.topP}
          aria-describedby="topP-desc"
        />
        <p id="topP-desc" className="text-xs text-gray-500">
          Controls nucleus sampling (lower values = more focused, higher = more
          diverse).
        </p>
      </div>
    </div>
  );
};

export default ParameterControls;
