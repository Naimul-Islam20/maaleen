"use client";

import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/toast-context";

export function Providers({ children }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
