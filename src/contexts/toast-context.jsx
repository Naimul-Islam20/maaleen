"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((text) => {
    setMessage(text);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), 3200);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${
          message
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {message ? (
          <div className="rounded-full border border-stone-200 bg-[var(--surface-elevated)] px-5 py-2.5 text-sm text-stone-800 shadow-lg">
            {message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
