"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "maaleen-wishlist";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time rehydrate */
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
    } = payload;
    setItems((prev) => {
      if (prev.some((i) => i.productId === productId)) return prev;
      return [
        ...prev,
        { productId, slug, name, price, currency, image: image ?? null },
      ];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const toggleItem = useCallback(
    (payload) => {
      const { productId } = payload;
      setItems((prev) => {
        if (prev.some((i) => i.productId === productId)) {
          return prev.filter((i) => i.productId !== productId);
        }
        const {
          slug,
          name,
          price,
          currency,
          image,
        } = payload;
        return [
          ...prev,
          { productId, slug, name, price, currency, image: image ?? null },
        ];
      });
    },
    [],
  );

  const isWishlisted = useCallback(
    (productId) => items.some((i) => i.productId === productId),
    [items],
  );

  const totalItems = items.length;

  const value = useMemo(
    () => ({
      items,
      ready,
      addItem,
      removeItem,
      toggleItem,
      isWishlisted,
      totalItems,
    }),
    [
      items,
      ready,
      addItem,
      removeItem,
      toggleItem,
      isWishlisted,
      totalItems,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
