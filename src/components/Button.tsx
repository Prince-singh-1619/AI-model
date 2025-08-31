import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  error?: string | null;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  error = null,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400";

  return (
    <div className="flex flex-col gap-1">
      <button
        disabled={loading}
        className={`${base} ${styles}`}
        aria-label={typeof children === "string" ? children : "Button"}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};