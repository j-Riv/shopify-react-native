import {
  SHOPIFY_STORE,
  SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_STOREFRONT_API_VERSION,
  SERVER_URL
} from '@env';

export const formatNumber = (num: string | number) =>
  typeof num === 'string' ? Number(num).toFixed(2) : num.toFixed(2);

export const authenticatedFetch = async (query: string, variables?: any) => {
  const url = `https://${SHOPIFY_STORE}.myshopify.com/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query, variables })
    });
    const json = await response.json();
    return json.data;
  } catch (err: any) {
    console.log('ERROR', err.message);
  }
};

export const formatPrice = (price: string | number) => {
  return typeof price === 'string'
    ? parseFloat(price).toFixed(2)
    : price.toFixed(2);
};

export const fetchKey = async () => {
  const url = `${SERVER_URL}/stripe-key`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    console.log('JSON', json);
    return json.publishableKey;
  } catch (err: any) {
    console.log('ERROR', err.message);
  }
};
