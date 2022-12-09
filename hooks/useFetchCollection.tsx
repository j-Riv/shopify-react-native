import { useEffect, useState } from 'react';

import { authenticatedFetch } from '../utils';

export const useFetchCollection = (handle: string) => {
  const [products, setProducts] = useState<any>(null);

  const query = `
    query getCollectionByHandle($handle: String!){
      collection(handle: $handle) {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              featuredImage {
                id
                src
              }
              variants(first: 100) {
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
                  }
                }
              }
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
      setProducts(data.collection.products.edges);
    };

    fetchData();
  }, []);

  return { products };
};
