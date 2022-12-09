import { useEffect, useState } from 'react';

export const useSelectedVariant = (product: any) => {
  const [firstAvailable, setFirstAvailable] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  useEffect(() => {
    if (product) {
      let variant = product.variants.edges[0].node;

      if (variant.quantityAvailable === 0) {
        const found = product.variants.edges.find(
          (el) => el.node.quantityAvailable > 0
        );
        if (found) variant = found.node;
      }

      setSelectedVariant(variant);
      setFirstAvailable(variant);
    }
  }, [product]);

  return { firstAvailable, selectedVariant, setSelectedVariant };
};
