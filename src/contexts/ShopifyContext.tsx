import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchShopifyPrices, ShopifyVariantInfo } from "@/utils/shopify";

const SHOPIFY_DOMAIN = "kaziranga-tea-factory-2.myshopify.com";

export type CartItem = {
  variantId: string;
  productId: number;
  productName: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

type ShopifyContextType = {
  prices: Record<string, ShopifyVariantInfo>;
  loading: boolean;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  removeUnavailableItems: () => void;
  getCartUrl: () => string;
  isVariantAvailable: (variantId: string) => boolean;
  getItemPrice: (variantId: string, fallbackPrice: number) => number;
  totalCount: number;
  totalPrice: number;
  hasUnavailableItems: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const ShopifyContext = createContext<ShopifyContextType>({
  prices: {},
  loading: true,
  cartItems: [],
  addToCart: () => false,
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  removeUnavailableItems: () => {},
  getCartUrl: () => `https://${SHOPIFY_DOMAIN}/cart`,
  isVariantAvailable: () => true,
  getItemPrice: (_, fallback) => fallback,
  totalCount: 0,
  totalPrice: 0,
  hasUnavailableItems: false,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

const LOCAL_STORAGE_KEY = "taju_tea_cart_items_v1";

export const ShopifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<Record<string, ShopifyVariantInfo>>({});
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to read cart from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  useEffect(() => {
    fetchShopifyPrices().then((data) => {
      console.log("SHOPIFY PRICES LOADED:", data);
      setPrices(data);
      setLoading(false);
    });
  }, []);

  const isVariantAvailable = (variantId: string): boolean => {
    if (prices[variantId] !== undefined) {
      return prices[variantId].available;
    }
    // If prices loaded and variant not in Shopify data, mark unavailable
    if (!loading) {
      return false;
    }
    return true; // default true while loading
  };

  const getItemPrice = (variantId: string, fallbackPrice: number): number => {
    if (prices[variantId]?.price) {
      return prices[variantId].price;
    }
    return fallbackPrice;
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1): boolean => {
    // Check live availability
    if (!isVariantAvailable(item.variantId)) {
      console.warn(`Cannot add variant ${item.variantId} - Out of stock on Shopify`);
      return false;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantId === item.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          price: getItemPrice(item.variantId, item.price),
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...item,
          price: getItemPrice(item.variantId, item.price),
          quantity,
        },
      ];
    });
    return true;
  };

  const removeFromCart = (variantId: string) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeUnavailableItems = () => {
    setCartItems((prev) => prev.filter((item) => isVariantAvailable(item.variantId)));
  };

  const availableCartItems = cartItems.filter((item) => isVariantAvailable(item.variantId));
  const hasUnavailableItems = cartItems.some((item) => !isVariantAvailable(item.variantId));

  const getCartUrl = () => {
    if (availableCartItems.length === 0) {
      return `https://${SHOPIFY_DOMAIN}/cart`;
    }
    // Shopify permalink format for available items: /cart/variant_id:qty,variant_id:qty
    const permalinkParts = availableCartItems.map((item) => `${item.variantId}:${item.quantity}`);
    return `https://${SHOPIFY_DOMAIN}/cart/${permalinkParts.join(",")}`;
  };

  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cartItems.reduce((acc, i) => {
    const itemPrice = getItemPrice(i.variantId, i.price);
    return acc + itemPrice * i.quantity;
  }, 0);

  return (
    <ShopifyContext.Provider
      value={{
        prices,
        loading,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        removeUnavailableItems,
        getCartUrl,
        isVariantAvailable,
        getItemPrice,
        totalCount,
        totalPrice,
        hasUnavailableItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopify = () => useContext(ShopifyContext);


