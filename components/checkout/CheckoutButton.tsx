import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { SERVER_URL } from '@env';

import { Button } from '../elements/';
import { Alert } from 'react-native';
import { useCart } from '../CartProviderV2/hooks';
import { formatNumber } from '../../utils';

function CheckoutButton({ navigation, checkoutTotal }) {
  const { cart, getNewCart, createDraftOrderFromCart } = useCart();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // send amount and customer
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${SERVER_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // amount: Number(cart?.totalPrice) * 100
        // amount: Math.round((Number(cart?.totalPrice) + Number.EPSILON) * 100)
        amount: Math.round((checkoutTotal + Number.EPSILON) * 100)
      })
    });
    console.log('PAYMENT SHEET', response);
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log('paymentIntent', paymentIntent);
    console.log('ephemeralKey', ephemeralKey);
    console.log('customer', customer);

    return {
      paymentIntent,
      ephemeralKey,
      customer
    };
  };

  const initializePaymentSheet = async () => {
    // const { paymentIntent, ephemeralKey, customer, publishableKey } =
    //   await fetchPaymentSheetParams();

    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe'
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      createDraftOrderFromCart();
      // kill checkout
      const newCart = getNewCart();
      if (newCart) {
        navigation.navigate('Collection');
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  useEffect(() => {
    initializePaymentSheet();
  }, [cart, checkoutTotal]);

  return (
    <Button
      disabled={!loading}
      // title={`Checkout $${formatNumber(cart?.totalPrice)}`}
      title={`Checkout $${formatNumber(checkoutTotal.toString())}`}
      onPress={openPaymentSheet}
    />
  );
}

export default CheckoutButton;
