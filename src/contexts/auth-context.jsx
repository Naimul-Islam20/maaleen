"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { validateEmailLogin, validatePhoneOtp } from "@/lib/demo-auth";

const STORAGE_KEY = "maaleen-auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, ready]);

  const loginWithEmail = useCallback((email, password) => {
    const account = validateEmailLogin(email, password);
    if (!account) return { ok: false, error: "Invalid email or password." };
    setUser(account);
    return { ok: true };
  }, []);

  const loginWithPhoneOtp = useCallback((phone, otp) => {
    const account = validatePhoneOtp(phone, otp);
    if (!account) return { ok: false, error: "Invalid phone number or OTP." };
    setUser(account);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      loginWithEmail,
      loginWithPhoneOtp,
      logout,
    }),
    [user, ready, loginWithEmail, loginWithPhoneOtp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
