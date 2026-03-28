"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "maaleen-cart";

const CartContext = createContext(null);

export function makeLineId(productId, size, color) {
  return `${productId}::${size}::${color}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount (SSR has no window; avoids hydration mismatch).
    /* eslint-disable react-hooks/set-state-in-effect -- intentional one-time rehydrate */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((payload) => {
    const {
      productId,
      slug,
      name,
      price,
      currency,
      image,
      size,
      color,
      quantity = 1,
    } = payload;
    const lineId = makeLineId(productId, size, color);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.lineId === lineId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          lineId,
          productId,
          slug,
          name,
          price,
          currency,
          image,
          size,
          color,
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((lineId, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.lineId !== lineId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      ready,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      subtotal,
    }),
    [
      items,
      ready,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      subtotal,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
