import { useState } from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';

import { useCart } from '../components/CartProvider/hooks';
import { Image } from '../components';

const Product = ({ line, onPress }) => {
  const { updateProductInCart, removeProductFromCart } = useCart();

  const handleQuantityChange = async (
    lineId: string,
    merchandiseId: string,
    quantity: number
  ) => {
    const qty = quantity < 0 ? 0 : quantity;
    await updateProductInCart(lineId, merchandiseId, qty);
  };

  const handleRemove = async (lineId: string) => {
    await removeProductFromCart(lineId);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.product}>
        <View style={styles.image}>
          <Image src={line.merchandise.image.src} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{line.merchandise.product.title}</Text>
          {line.merchandise.title !== 'Default Title' && (
            <Text style={styles.subtitle}>{line.merchandise.title}</Text>
          )}
          <Text style={styles.price}>${line.merchandise.priceV2.amount}</Text>
          <View style={styles.lineUpdateContainer}>
            <Pressable
              style={styles.lineUpdateButton}
              onPress={() =>
                handleQuantityChange(
                  line.id,
                  line.merchandise.id,
                  line.quantity - 1
                )
              }
            >
              <Text>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{line.quantity}</Text>
            <Pressable
              style={styles.lineUpdateButton}
              onPress={() =>
                handleQuantityChange(
                  line.id,
                  line.merchandise.id,
                  line.quantity + 1
                )
              }
            >
              <Text>+</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => handleRemove(line.id)}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Cart = ({ navigation }) => {
  const { cart } = useCart();
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Product
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
      <Text style={styles.text}>Cart</Text>
      {cart.lines.edges.length > 0 ? (
        <FlatList
          data={cart.lines.edges}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id}
          extraData={selectedId}
        />
      ) : (
        <Text style={styles.text}>Empty</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 20
  },
  image: {
    width: '30%'
  },
  item: {
    width: '70%',
    paddingLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12
  },
  price: {
    fontSize: 16
  },
  quantity: {
    fontSize: 16
  },
  lineUpdateContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  lineUpdateButton: {
    padding: 10
  },
  remove: {
    textAlign: 'right',
    paddingRight: 20
  }
});

export default Cart;
