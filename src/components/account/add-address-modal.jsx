"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCountry } from "@/contexts/country-context";
import { COUNTRY_CITIES } from "@/lib/country-config";

function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const inputClassName =
  "mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15";

function createEmptyForm(country) {
  return {
    title: "",
    recipientName: "",
    phone: "",
    countryCode: country.code,
    country: country.label,
    dialCode: country.dialCode,
    city: "",
    address: "",
    isDefault: false,
  };
}

export function AddAddressModal({ open, onClose, onSave }) {
  const { country, countryCode } = useCountry();
  const [form, setForm] = useState(() => createEmptyForm(country));

  useEffect(() => {
    if (!open) return undefined;
    setForm(createEmptyForm(country));
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, country]);

  const cities = COUNTRY_CITIES[countryCode] ?? [];

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(form);
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close add address modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-address-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <h2
                id="add-address-title"
                className="text-lg font-semibold text-stone-900"
              >
                Add New Address
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800"
              >
                <CloseIcon />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5"
            >
              <div className="space-y-4">
                <label className="block text-sm font-medium text-stone-700">
                  Address Title
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    placeholder="Home, Office, etc."
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-medium text-stone-700">
                  Recipient Name
                  <input
                    required
                    type="text"
                    value={form.recipientName}
                    onChange={(event) =>
                      updateField("recipientName", event.target.value)
                    }
                    className={inputClassName}
                  />
                </label>

                <div>
                  <span className="block text-sm font-medium text-stone-700">
                    Phone Number
                  </span>
                  <div className="mt-1 flex overflow-hidden rounded-lg border border-stone-200 bg-white focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15">
                    <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-sm text-stone-600">
                      {country.label}
                    </span>
                    <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-sm text-stone-600">
                      {country.dialCode}
                    </span>
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, country.phoneMaxLength),
                        )
                      }
                      placeholder="Phone Number"
                      className="min-w-0 flex-1 px-3 py-2.5 text-sm text-stone-900 outline-none"
                    />
                  </div>
                </div>

                <label className="block text-sm font-medium text-stone-700">
                  Country
                  <input
                    type="text"
                    readOnly
                    value={country.label}
                    className={`${inputClassName} cursor-not-allowed bg-stone-50 text-stone-700`}
                  />
                </label>

                <label className="block text-sm font-medium text-stone-700">
                  Select City
                  <select
                    required
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    className={inputClassName}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-stone-700">
                  Address
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className={inputClassName}
                  />
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(event) =>
                      updateField("isDefault", event.target.checked)
                    }
                    className="h-4 w-4 rounded border-stone-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  Set default address
                </label>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Save Address
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
