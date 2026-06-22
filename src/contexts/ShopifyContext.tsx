import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchShopifyPrices, ShopifyVariantInfo } from "@/utils/shopify";

type ShopifyContextType = {
  prices: Record<string, ShopifyVariantInfo>;
  loading: boolean;
};

const ShopifyContext = createContext<ShopifyContextType>({
  prices: {},
  loading: true,
});

export const ShopifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<Record<string, ShopifyVariantInfo>>({});
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
