"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { CountryProvider } from "@/contexts/country-context";
import { ToastProvider } from "@/contexts/toast-context";
import { WishlistProvider } from "@/contexts/wishlist-context";

export function Providers({ children }) {
  return (
    <ToastProvider>
      <CountryProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </CountryProvider>
    </ToastProvider>
  );
}
