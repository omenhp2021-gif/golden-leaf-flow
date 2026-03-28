const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function fetchShopifyPrices(): Promise<Record<string, number>> {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            variants(first: 100) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
      console.warn("Shopify Environment Variables are missing.");
      return {};
    }

    if (!response.ok) {
      console.error("Shopify API Error:", response.statusText);
      return {};
    }

    const json = await response.json();
    const priceMap: Record<string, number> = {};

    if (json.data?.products?.edges) {
      json.data.products.edges.forEach(({ node: product }: any) => {
        product.variants?.edges?.forEach(({ node: variant }: any) => {
          // Extract variant numeric ID from global ID (e.g. gid://shopify/ProductVariant/48737792524531)
          const numericId = variant.id.split("/").pop();
          if (numericId && variant.price?.amount) {
            priceMap[numericId] = parseFloat(variant.price.amount);
          }
        });
      });
    }

    return priceMap;
  } catch (error) {
    console.error("Failed to fetch Shopify prices:", error);
    return {};
  }
}
