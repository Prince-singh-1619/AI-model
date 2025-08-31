import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type Theme = "dark" | "light";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme | null>(null); // null = loading
  const [error, setError] = useState<string | null>(null);

  // Apply theme on component mount
  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme(savedTheme);
    } catch (err) {
      setError("Failed to load theme preference.");
    }
  }, []);

  useEffect(() => {
    if (!theme) return; // avoid running during "loading"
    try {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);

      // Dispatch custom event for theme change
      window.dispatchEvent(new Event("themeChange"));
    } catch (err) {
      setError("Failed to apply theme.");
    }
  }, [theme]);

  const themeHandler = (): void => {
    if (!theme) return; // ignore clicks while loading
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="text-red-600 dark:text-red-400 text-sm"
      >
        {error}
      </div>
    );
  }

  if (theme === null) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-gray-600 dark:text-gray-300 text-sm"
      >
        Loading theme...
      </div>
    );
  }

  return (
    <button
      onClick={themeHandler}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="btn flex justify-center items-center gap-2 p-2 mx-auto rounded-full cursor-pointer"
    >
      Switch to{" "}
      {theme === "dark" ? (
        <div className="flex gap-2 justify-center items-center">
          <MdLightMode size={24} aria-hidden="true" />
          <span>Light Mode</span>
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <MdDarkMode size={24} aria-hidden="true" />
          <span>Dark Mode</span>
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;