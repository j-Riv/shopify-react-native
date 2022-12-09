import { createContext } from 'react';
import { ICart } from './types';

const defaultContext: ICart = {
  cart: {
    id: '',
    createdAt: '',
    updatedAt: '',
    lines: {
      edges: []
    },
    attributes: [],
    cost: {
      totalAmount: {
        amount: '0.0',
        currencyCode: 'USD'
      },
      subtotalAmount: {
        amount: '0.0',
        currencyCode: 'USD'
      },
      totalTaxAmount: null,
      totalDutyAmount: null
    }
  },
  addingToCart: false,
  addProductToCart: async (gid: string) => {},
  updateProductInCart: async (lineId: string) => {},
  removeProductFromCart: async (lineId: string) => {}
};

export const CartContext = createContext(defaultContext);
