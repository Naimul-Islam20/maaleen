"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";

export default function SuccessPopup({ orderId, total }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="bg-[var(--accent)] py-10 px-6 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Order Confirmed!</h2>
          <p className="mt-2 text-sm text-white/80 uppercase tracking-widest">
            Order #{orderId}
          </p>
        </div>

        <div className="p-8 text-center">
          <p className="text-stone-600 leading-relaxed text-justify">
            Thank you for shopping with MAALEEN. We've received your order and are
            getting it ready for shipment. You'll receive an email confirmation shortly.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-t border-stone-100 pt-4 text-sm">
              <span className="text-stone-500 uppercase tracking-wider text-[11px] font-bold">Total Amount</span>
              <span className="font-bold text-stone-900">{formatPrice(total)}</span>
            </div>

            <Link
              href="/"
              className="block w-full rounded-full bg-stone-900 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
