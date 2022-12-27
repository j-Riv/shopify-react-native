import { createContext } from 'react';
import { ICart, IVariant } from './types';

const defaultContext: ICart = {
  cart: {
    subtotalPrice: '',
    totalPrice: '',
    totalShippingPrice: '',
    totalTax: '',
    availableShippingRates: [],
    lineItems: []
  },
  addingToCart: false,
  addProductToCart: async (variant: IVariant) => {},
  updateProductInCart: async (variant: IVariant) => {},
  removeProductFromCart: async (gid: string) => {},
  createDraftOrderFromCart: async () => {},
  getNewCart: async () => {},
  shippingRate: {
    handle: '',
    title: '',
    price: {
      amount: '0'
    }
  },
  handleShippingUpdate: (handle: string) => {}
};

export const CartContext = createContext(defaultContext);
