import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { SERVER_URL } from '@env';

import { Button } from '../elements/';
import { Alert } from 'react-native';
import { useCart } from '../CartProvider/hooks';
import { formatNumber } from '../../utils';

function CheckoutButton({ navigation }) {
  const { cart, getNewCart } = useCart();
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
        amount: parseFloat(cart?.cost?.totalAmount.amount) * 100
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
      // kill checkout
      const newCart = await getNewCart();
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
  }, [cart]);

  return (
    <Button
      disabled={!loading}
      title={`Checkout $${formatNumber(cart?.cost?.totalAmount.amount)}`}
      onPress={openPaymentSheet}
    />
  );
}

export default CheckoutButton;
