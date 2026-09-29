"use client";

import { useState } from "react";

export function TrackOrderForm() {
  const [invoice, setInvoice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = invoice.trim();
    if (!value) {
      setError("Please enter your invoice number.");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label htmlFor="invoice" className="sr-only">
        Invoice Number
      </label>
      <input
        id="invoice"
        type="text"
        value={invoice}
        onChange={(event) => {
          setInvoice(event.target.value);
          if (error) setError("");
          if (submitted) setSubmitted(false);
        }}
        placeholder="Invoice Number *"
        className="w-full rounded-md border border-[var(--primary)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--primary)] outline-none transition-colors placeholder:text-[var(--primary)]/45 focus:border-[var(--primary)]"
        aria-required="true"
      />

      {error ? (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      ) : null}

      {submitted ? (
        <p className="mt-3 text-sm text-[var(--primary)]">
          Looking up order{" "}
          <span className="font-semibold">{invoice.trim()}</span>…
          Tracking details will appear here once connected to your order system.
        </p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Track Order
        </button>
      </div>
    </form>
  );
}
