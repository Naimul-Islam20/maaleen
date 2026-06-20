"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCountryConfig } from "@/lib/country-config";

const STORAGE_KEY = "maaleen-country";

const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const [countryCode, setCountryCodeState] = useState("BD");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "BD" || saved === "AU") {
        setCountryCodeState(saved);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, countryCode);
  }, [countryCode, ready]);

  const setCountryCode = useCallback((code) => {
    if (code === "BD" || code === "AU") {
      setCountryCodeState(code);
    }
  }, []);

  const country = useMemo(() => getCountryConfig(countryCode), [countryCode]);

  const value = useMemo(
    () => ({
      countryCode,
      country,
      setCountryCode,
      ready,
    }),
    [countryCode, country, setCountryCode, ready],
  );

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
