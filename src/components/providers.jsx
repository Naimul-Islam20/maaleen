"use client";

import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/toast-context";
import { WishlistProvider } from "@/contexts/wishlist-context";

export function Providers({ children }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
