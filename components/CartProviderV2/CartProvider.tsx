import { useEffect, useMemo, useState, useReducer } from 'react';

import { authenticatedFetch } from '../../utils';
import { CartContext } from './context';
import {
  createCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove
} from './handlers';

import { SERVER_URL } from '@env';
import { IVariant } from './types';

const initialCart = {
  subtotalPrice: '',
  totalPrice: '',
  totalShippingPrice: '',
  totalTax: '',
  availableShippingRates: [],
  lineItems: []
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<any>(initialCart);
  const [shippingRate, setShippingRate] = useState<any>({
    handle: '',
    price: { amount: 0 },
    title: ''
  });
  const [addingToCart, setAddingToCart] = useState<boolean>(false);

  const getNewCart = () => {
    setCart(initialCart);
    return initialCart;
  };

  // init checkout
  useEffect(() => {
    // validate checkout
    const initializeCheckout = () => {
      try {
        getNewCart();
      } catch (err: any) {
        console.log('ERROR CREATING CART', err);
      }
    };

    initializeCheckout();
  }, []);

  const addProductToCart = async (variant: IVariant) => {
    setAddingToCart(true);
    console.log('ADDING PRODUCT TO CART', cart);

    const lineItems = [...cart.lineItems];
    const foundIndex = lineItems.findIndex(
      (el: any) => el.variant.id === variant.id
    );
    console.log('FOUND INDEX', foundIndex);
    if (foundIndex !== -1) {
      lineItems[foundIndex].quantity += variant.quantity;
    } else {
      lineItems.push({ id: variant.id, quantity: variant.quantity });
    }

    console.log('LINE ITEMS', lineItems);

    const data = {
      customerId: 'gid://shopify/Customer/5615408971874',
      lineItems: lineItems.map((el) => ({
        variantId: el.id ? el.id : el.variant.id,
        quantity: el.quantity
      })),
      // shippingLine: {
      //   price: '5.74',
      //   shippingRateHandle: 'usps-first-class-package',
      //   title: 'USPS First Class Package'
      // }
      taxExempt: false,
      useCustomerDefaultAddress: true
    };

    console.log('DATA', data);

    try {
      const url = `${SERVER_URL}/order/draft/calculate`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log('RESPONSE', json);
      // dispatch action
      setCart(json);
      setAddingToCart(false);
      return json;
    } catch (err: any) {
      setAddingToCart(false);
      console.log('ERROR', err.message);
    }
  };

  const updateProductInCart = async (variant: IVariant) => {
    setAddingToCart(true);
    console.log('UPDATING PRODUCT IN CART', variant);

    const lineItems = [...cart.lineItems];

    if (lineItems.length === 1 && variant.quantity === 0) {
      getNewCart();
      setAddingToCart(false);
      return true;
    }

    const foundIndex = lineItems.findIndex(
      (el: any) => el.variant.id === variant.id
    );
    console.log('FOUND INDEX', foundIndex);
    if (foundIndex !== -1) {
      lineItems[foundIndex].quantity = variant.quantity;
    }

    console.log('UPDATING -- LINE ITEMS', lineItems);

    const data = {
      customerId: 'gid://shopify/Customer/5615408971874',
      lineItems: lineItems.map((el) => ({
        variantId: el.id ? el.id : el.variant.id,
        quantity: el.quantity
      })),
      // shippingLine: {
      //   price: '5.74',
      //   shippingRateHandle: 'usps-first-class-package',
      //   title: 'USPS First Class Package'
      // }
      taxExempt: false,
      useCustomerDefaultAddress: true
    };

    console.log('DATA', data);

    try {
      const url = `${SERVER_URL}/order/draft/calculate`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log('RESPONSE', json);
      // dispatch action
      setCart(json);
      setAddingToCart(false);
      return json;
    } catch (err: any) {
      setAddingToCart(false);
      console.log('ERROR', err.message);
    }
  };

  const removeProductFromCart = async (gid: string) => {
    setAddingToCart(true);
    console.log('REMOVING PRODUCT IN CART', cart);

    const lineItems = [...cart.lineItems];

    if (lineItems.length === 1) {
      getNewCart();
      setAddingToCart(false);
      return true;
    }

    const foundIndex = lineItems.findIndex((el: any) => el.variant.id === gid);
    console.log('FOUND INDEX', foundIndex);
    if (foundIndex !== -1) {
      lineItems.splice(foundIndex, 1);
    }

    console.log('REMOVING --- LINE ITEMS', lineItems);

    const data = {
      customerId: 'gid://shopify/Customer/5615408971874',
      lineItems: lineItems.map((el) => ({
        variantId: el.id ? el.id : el.variant.id,
        quantity: el.quantity
      })),
      // shippingLine: {
      //   price: '5.74',
      //   shippingRateHandle: 'usps-first-class-package',
      //   title: 'USPS First Class Package'
      // }
      taxExempt: false,
      useCustomerDefaultAddress: true
    };

    console.log('DATA', data);

    try {
      const url = `${SERVER_URL}/order/draft/calculate`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log('RESPONSE', json);
      // dispatch action
      setCart(json);
      setAddingToCart(false);
      return json;
    } catch (err: any) {
      setAddingToCart(false);
      console.log('ERROR', err.message);
    }
  };

  const createDraftOrderFromCart = async () => {
    try {
      const url = `${SERVER_URL}/order/draft/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lineItems: cart.lineItems,
          shippingLine: {
            price: shippingRate.price.amount,
            shippingRateHandle: shippingRate.handle,
            title: shippingRate.title
          }
        })
      });
      const json = await response.json();
      console.log('RESPONSE', json);
      return json;
    } catch (err: any) {
      console.log('ERROR', err.message);
    }
  };

  const handleShippingUpdate = (handle: string) => {
    if (cart?.availableShippingRates.length === 0) {
      return;
    }

    const rate = cart?.availableShippingRates.find(
      (el) => el.handle === handle
    );

    setShippingRate(rate);
  };

  const cartContextValue = useMemo(() => {
    return {
      cart,
      addingToCart,
      addProductToCart,
      updateProductInCart,
      removeProductFromCart,
      createDraftOrderFromCart,
      getNewCart,
      shippingRate,
      handleShippingUpdate
    };
  }, [
    cart,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
    handleShippingUpdate
  ]);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
