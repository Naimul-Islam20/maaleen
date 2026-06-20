"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

function LoginPanelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const { loginWithEmail, loginWithPhoneOtp, isAuthenticated, ready } = useAuth();

  const [mode, setMode] = useState("email");
  const [phoneStep, setPhoneStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (ready && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [ready, isAuthenticated, router, redirectTo]);

  useEffect(() => {
    if (otpTimer <= 0) return undefined;
    const id = setInterval(() => {
      setOtpTimer((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [otpTimer]);

  const resetError = () => setError("");

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    resetError();
    const result = loginWithEmail(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
  };

  const handleSendOtp = (event) => {
    event.preventDefault();
    resetError();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    setPhoneStep("otp");
    setOtpTimer(60);
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    resetError();
    const result = loginWithPhoneOtp(phone, otp);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setPhoneStep("phone");
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-[var(--background)] shadow-sm">
        <div className="maaleen-brand-bg px-6 py-8 text-center text-white sm:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-white/85">
            Sign in to continue to your account
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-white/80">
            <span className="rounded-full border border-white/25 px-3 py-1">
              Trusted quality
            </span>
            <span className="rounded-full border border-white/25 px-3 py-1">
              Nationwide delivery
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-stone-200/40 p-1">
            <button
              type="button"
              onClick={() => switchMode("phone")}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${
                mode === "phone"
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Login with Phone
            </button>
            <button
              type="button"
              onClick={() => switchMode("email")}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${
                mode === "email"
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Login with Email
            </button>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          {mode === "phone" ? (
            phoneStep === "phone" ? (
              <form className="mt-6 space-y-4" onSubmit={handleSendOtp}>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold uppercase tracking-wide text-stone-600"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2 flex overflow-hidden rounded-lg border border-stone-300 bg-white focus-within:border-[var(--primary)]">
                    <span className="inline-flex items-center bg-stone-50 px-3 text-sm font-medium text-stone-700">
                      +880
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="1XXXXXXXXX"
                      className="min-w-0 flex-1 px-3 py-2.5 text-sm text-stone-900 outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs text-stone-500">
                    Enter 10-digit number without country code
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleVerifyOtp}>
                <div>
                  <h2 className="text-lg font-semibold text-stone-900">
                    Verify OTP
                  </h2>
                  <p className="mt-1 text-sm text-stone-600">
                    We&apos;ve sent a verification code to +880{phone}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="text-xs font-semibold uppercase tracking-wide text-stone-600"
                  >
                    OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(event) =>
                      setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="6-digit code"
                    className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm tracking-[0.3em] text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Verify OTP
                </button>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneStep("phone");
                      setOtp("");
                      resetError();
                    }}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    Back to options
                  </button>
                  {otpTimer > 0 ? (
                    <span className="text-stone-500">
                      Resend OTP in {otpTimer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOtpTimer(60)}
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            )
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleEmailSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wide text-stone-600"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wide text-stone-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-[var(--primary)]"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-stone-300 text-[var(--primary)]"
                />
                Keep me signed in
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Sign In
              </button>
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-stone-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginPanel() {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-lg animate-pulse rounded-2xl bg-[var(--background)]" />}>
      <LoginPanelContent />
    </Suspense>
  );
}
