import { useEffect, useMemo, useState } from 'react';

import { authenticatedFetch } from '../../utils';
import { CartContext } from './context';
import {
  createCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove
} from './handlers';

export const CartProvider = ({ children }) => {
  // create methods to access storefront api

  const [cart, setCart] = useState<any>(null);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);

  const getNewCart = async () => {
    const response = await authenticatedFetch(createCart);
    if (response) {
      setCart(response.cartCreate.cart);
    }
  };

  // init checkout
  useEffect(() => {
    // validate checkout
    const initializeCheckout = async () => {
      try {
        await getNewCart();
      } catch (err: any) {
        console.log('ERROR CREATING CART', err);
      }
    };

    initializeCheckout();
  }, []);

  const addProductToCart = async (gid: string) => {
    const query = cartLinesAdd;
    const variables = {
      cartId: cart.id,
      lines: {
        merchandiseId: gid,
        quantity: 1
      }
    };
    try {
      setAddingToCart(true);
      const data = await authenticatedFetch(query, variables);
      if (data) {
        setCart(data.cartLinesAdd.cart);
        setAddingToCart(false);
        return data.cartLinesAdd.cart;
      }
    } catch (err: any) {
      console.log('ERROR ADDING TO CART', err);
      setAddingToCart(false);
    }
  };

  const updateProductInCart = async (
    id: string,
    merchandiseId: string,
    quantity: number
  ) => {
    const query = cartLinesUpdate;
    const variables = {
      cartId: cart.id,
      lines: [
        {
          id,
          merchandiseId,
          quantity
        }
      ]
    };
    try {
      const data = await authenticatedFetch(query, variables);
      if (data) {
        setCart(data.cartLinesUpdate.cart);
        // setAddingToCart(false);
        return data.cartLinesUpdate.cart;
      }
    } catch (err: any) {
      console.log('ERROR UPDATING CART', err);
    }
  };

  const removeProductFromCart = async (lineId: string) => {
    const query = cartLinesRemove;
    const variables = {
      cartId: cart.id,
      lineIds: [lineId]
    };
    try {
      const data = await authenticatedFetch(query, variables);
      if (data) {
        setCart(data.cartLinesRemove.cart);
        return data.cartLinesRemove.cart;
      }
    } catch (err: any) {
      console.log('ERROR REMOVING PRODUCT FROM CART', err);
    }
  };

  const cartContextValue = useMemo(() => {
    return {
      cart,
      addingToCart,
      addProductToCart,
      updateProductInCart,
      removeProductFromCart
    };
  }, [cart, addProductToCart, updateProductInCart, removeProductFromCart]);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
