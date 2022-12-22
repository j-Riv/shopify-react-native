import { FlatList, Text, SafeAreaView, StyleSheet, View } from 'react-native';

import { useCart } from '../components/CartProvider/hooks';
import { CartProduct, CheckoutButton } from '../components';
import { formatNumber } from '../utils';

const Cart = ({ navigation }) => {
  const { cart } = useCart();

  console.log('CART', cart);

  const renderItem = ({ item }) => {
    return (
      <CartProduct
        line={item.node}
        onPress={() =>
          navigation.navigate('Product', {
            handle: item.node.merchandise.product.handle
          })
        }
      />
    );
  };

  return (
    <SafeAreaView>
      {cart.lines.edges.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={cart.lines.edges}
            renderItem={renderItem}
            keyExtractor={(item) => item.node.id}
          />
          <View>
            <Text style={styles.totals}>
              Subtotal ${formatNumber(cart?.cost?.subtotalAmount.amount)}{' '}
              {cart?.cost?.subtotalAmount.currencyCode}
            </Text>
            <Text style={styles.totals}>
              Estimated Taxes ${/*@ts-ignore*/}
              {formatNumber(cart?.cost?.totalTaxAmount!.amount)}{' '}
              {/*@ts-ignore*/}
              {cart?.cost?.totalTaxAmount.currencyCode}
            </Text>
          </View>
          <CheckoutButton navigation={navigation} />
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
