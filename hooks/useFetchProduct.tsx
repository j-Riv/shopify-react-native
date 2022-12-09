import { useEffect, useState } from 'react';

import { authenticatedFetch } from '../utils';

export const useFetchProduct = (handle: string) => {
  const [product, setProduct] = useState<any>(null);

  const query = `
    query getProductByHandle($handle: String!){
      product(handle: $handle) {
        id
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          id
          src
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              image {
                id
                src
              }
              priceV2 {
                amount
              }
              quantityAvailable
              availableForSale
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await authenticatedFetch(query, variables);
      setProduct(data.product);
    };

    fetchData();
  }, []);

  return { product };
};
