import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchShopifyPrices } from "@/utils/shopify";

type ShopifyContextType = {
  prices: Record<string, number>;
  loading: boolean;
};

const ShopifyContext = createContext<ShopifyContextType>({
  prices: {},
  loading: true,
});

export const ShopifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopifyPrices().then((data) => {
      console.log("SHOPIFY PRICES LOADED:", data);
      setPrices(data);
      setLoading(false);
    });
  }, []);

  return (
    <ShopifyContext.Provider value={{ prices, loading }}>
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopify = () => useContext(ShopifyContext);
