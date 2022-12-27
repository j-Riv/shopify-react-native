import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet
} from 'react-native';

import { useCart } from '../CartProviderV2/hooks';
import { Image } from '../elements';
import { formatPrice } from '../../utils';

const CartProduct = ({ line, onPress }) => {
  console.log('LINE', line);
  const { updateProductInCart, removeProductFromCart } = useCart();

  const handleQuantityChange = async (id: string, qty: number) => {
    const quantity = qty < 0 ? 0 : qty;
    await updateProductInCart({ id, quantity });
  };

  const handleRemove = async (id: string) => {
    await removeProductFromCart(id);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.product}>
        <View style={styles.image}>
          <Image src={line.image.url} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{line.name}</Text>
          {line.name !== 'Default Title' && (
            <Text style={styles.subtitle}>{line.name}</Text>
          )}
          <Text style={styles.price}>
            ${formatPrice(line.originalUnitPrice.amount)}
          </Text>
          <View style={styles.lineUpdateContainer}>
            <Pressable
              style={styles.lineUpdateButton}
              onPress={() =>
                handleQuantityChange(line.variant.id, line.quantity - 1)
              }
            >
              <Text>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{line.quantity}</Text>
            <Pressable
              style={styles.lineUpdateButton}
              onPress={() =>
                handleQuantityChange(line.variant.id, line.quantity + 1)
              }
            >
              <Text>+</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => handleRemove(line.variant.id)}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
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

export default CartProduct;
