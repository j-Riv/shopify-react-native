export interface ICart {
  cart: {
    subtotalPrice: string;
    totalPrice: string;
    totalShippingPrice: string;
    totalTax: string;
    availableShippingRates: {
      handle: string;
      title: string;
      price: {
        amount: string;
      };
    }[];
    lineItems: {
      name: string;
      sku: string;
      originalPrice: {
        amount: string;
      };
      variant: {
        id: string;
      };
      quantity: number;
    }[];
  };
  addingToCart: boolean;
  addProductToCart: (variant: IVariant) => Promise<void>;
  updateProductInCart: (variant: IVariant) => Promise<void>;
  removeProductFromCart: (gid: string) => Promise<void>;
  createDraftOrderFromCart: () => Promise<any>;
  getNewCart: () => {};
  shippingRate: {
    handle: string;
    title: string;
    price: {
      amount: string;
    };
  };
  handleShippingUpdate: (handle: string) => void;
}

export interface IVariant {
  id: string;
  quantity: number;
}
