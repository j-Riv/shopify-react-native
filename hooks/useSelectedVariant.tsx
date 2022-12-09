import { useEffect, useState } from 'react';

export const useSelectedVariant = (product: any) => {
  const [firstAvailable, setFirstAvailable] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  useEffect(() => {
    if (product) {
      const variant = product.variants.edges[0].node;
      setSelectedVariant(variant);
      setFirstAvailable(variant);
    }
  }, [product]);

  return { firstAvailable, selectedVariant, setSelectedVariant };
};
