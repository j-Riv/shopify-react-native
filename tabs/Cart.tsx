import { useEffect, useState } from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useCart } from '../components/CartProviderV2/hooks';
import { CartProduct, CheckoutButton } from '../components';
import { formatNumber } from '../utils';

const ShippingDropDown = ({
  availableShippingRates,
  handleShippingUpdate
}: {
  availableShippingRates: any[];
  handleShippingUpdate: (handle: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(availableShippingRates[0].handle);
  const [items, setItems] = useState(
    availableShippingRates.map((el: any) => ({
      label: el.title,
      value: el.handle
    }))
  );

  useEffect(() => {
    handleShippingUpdate(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

const Cart = ({ navigation }) => {
  const { cart, shippingRate, handleShippingUpdate } = useCart();

  const availableShippingRates = cart?.availableShippingRates;

  console.log('CART', cart);

  const renderItem = ({ item }) => {
    return (
      <CartProduct
        line={item}
        onPress={() =>
          navigation.navigate('Product', {
            handle: item.product.handle
          })
        }
      />
    );
  };

  const checkoutTotal = cart?.totalPrice
    ? Number(cart?.totalPrice) + Number(shippingRate.price.amount)
    : 0;
  console.log('CHECKOUT TOTAL', checkoutTotal);

  return (
    <SafeAreaView>
      {cart.lineItems.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={cart.lineItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.variant.id}
          />
          {availableShippingRates.length > 0 && (
            <ShippingDropDown
              availableShippingRates={availableShippingRates}
              handleShippingUpdate={handleShippingUpdate}
              key={JSON.stringify(availableShippingRates)}
            />
          )}

          <View>
            <Text style={styles.totals}>
              Subtotal ${formatNumber(cart?.subtotalPrice)}
            </Text>
            <Text style={styles.totals}>
              Estimated Taxes ${/*@ts-ignore*/}
              {cart?.totalTax ? formatNumber(cart?.totalTax) : ''}
            </Text>
            <Text style={styles.totals}>
              Estimated Shipping ${/*@ts-ignore*/}
              {cart?.availableShippingRates.length > 0
                ? formatNumber(shippingRate.price.amount)
                : ''}
            </Text>
          </View>
          <CheckoutButton
            navigation={navigation}
            checkoutTotal={checkoutTotal}
          />
        </View>
      ) : (
        <Text style={styles.text}>Empty</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    margin: 5
  },
  totals: {
    textAlign: 'right',
    margin: 5
  }
});

export default Cart;
