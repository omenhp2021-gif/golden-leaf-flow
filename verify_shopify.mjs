const SHOPIFY_DOMAIN = "kaziranga-tea-factory-2.myshopify.com";
const STOREFRONT_TOKEN = "a9aabfb02dbe578cacb0dd4f7aea7b19";

const query = `
{
  products(first: 50) {
    edges {
      node {
        handle
        variants(first: 10) {
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

async function main() {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}
main();
