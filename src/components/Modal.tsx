import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, loading = false, error = null }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}
        {loading ? <p className="text-gray-500">Loading...</p> : children}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};