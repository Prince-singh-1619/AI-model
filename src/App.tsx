import React from 'react'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import PromptTemplates from './components/PromptTemplates'
import ParameterControls from './components/ParameterControls'
import ChatInterface from './pages/ChatInterface'

function App() {
  const [params, setParams] = React.useState({
    temperature: 0.7,
    maxTokens: 500,
    topP: 1,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // ✅ Listen for model change
  window.addEventListener("modelChange", (e: Event) => {
    const customEvent = e as CustomEvent<string>;
    console.log("Selected model:", customEvent.detail);
  });

  React.useEffect(() => {
    const handleParamsChanged = (e: Event) => {
      const { detail } = e as CustomEvent<typeof params>;
      setParams(detail);
      console.log("Parameters updated:", detail);
    };

    window.addEventListener("paramsChanged", handleParamsChanged);
    return () => window.removeEventListener("paramsChanged", handleParamsChanged);
  }, []);

  return (
    <div 
      className="w-screen min-md:h-screen overflow-x-hidden flex max-md:flex-col" 
      aria-label="AI Chat Application"
    >
      {/* Chat */}
      <div 
        className="relative flex-1 h-full border-r border-gray-300 dark:border-gray-700 overflow-y-hidden md:overflow-y-hidden" 
        role="main"
        aria-live="polite"
      >
        {/* Global Loading State */}
        {loading && (
          <div 
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-black px-4 py-2 rounded-xl text-blue-600 shadow-md"
            role="status"
            aria-live="assertive"
          >
            Loading response...
          </div>
        )}

        {/* Global Error State */}
        {error && (
          <div className="p-4 text-center text-red-600" role="alert">
            {error}
          </div>
        )}

        {/* Chat Interface */}
        <ChatInterface 
          params={params} 
          // Allow ChatInterface to update loading/error
          // setLoading={setLoading}
          // setError={setError}
        />
      </div>

      {/* Sidebar */}
      <div 
        className="w-full md:w-1/4 h-full overflow-y-auto p-2 flex flex-col justify-start items-center gap-4"
        role="complementary"
        aria-label="Settings and Controls"
      >
        <ThemeToggle />
        <ParameterControls />
        <PromptTemplates />
      </div>
    </div>
  )
}

export type AIParams = {
  temperature: number;
  maxTokens: number;
  topP: number;
};

export default App