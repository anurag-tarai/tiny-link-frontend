import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback((msg, type = "info", duration = 3000) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, msg, type }]);

    // Remove toast after duration
    setTimeout(() => {
      setMessages((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container at bottom-right */}
      <div className="fixed top-20 right-20 z-50 flex flex-col gap-3 items-end">
        {messages.map((t) => (
          <div
            key={t.id}
            className={`px-5 py-3 rounded-lg shadow-lg text-white text-base ${
              t.type === "error"
                ? "bg-red-600"
                : t.type === "success"
                ? "bg-green-600"
                : "bg-gray-800"
            }`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
