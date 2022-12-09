import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useFetchProduct, useSelectedVariant } from '../hooks';
import { Button as Btn, Image } from '../components';
import { useCart } from '../components/CartProvider/hooks';
import { formatPrice } from '../utils';

const ProductTemplate = ({ product }: { product: any }) => {
  const { firstAvailable, selectedVariant, setSelectedVariant } =
    useSelectedVariant(product);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    product.variants.edges.map((el: { node: any }) => ({
      label: el.node.title,
      value: el.node.id
    }))
  );

  useEffect(() => {
    if (firstAvailable) setValue(firstAvailable.id);
  }, [firstAvailable]);

  useEffect(() => {
    const variant = product.variants.edges.find((el) => {
      return el.node.id === value;
    });
    if (variant) {
      setSelectedVariant(variant.node);
    }
  }, [value]);

  const { cart, addingToCart, addProductToCart } = useCart();

  const handleAddToCart = async (gid: string) => {
    await addProductToCart(gid);
  };

  const disabled = selectedVariant?.quantityAvailable > 0 ? false : true;
  const title = disabled
    ? 'Out of Stock'
    : addingToCart
    ? 'Adding...'
    : 'Add To Cart';

  return (
    <View style={styles.productComponent}>
      <Image
        src={
          selectedVariant?.image?.src
            ? selectedVariant.image.src
            : product.featuredImage.src
        }
        fullWidth={true}
      />
      <Text style={styles.title}>{product.title}</Text>
      {product.variants.edges.length > 1 && (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      )}

      <Text style={styles.price}>
        $
        {selectedVariant?.priceV2.amount &&
          formatPrice(selectedVariant?.priceV2.amount)}
      </Text>
      <Btn
        onPress={() => handleAddToCart(selectedVariant.id)}
        title={title}
        disabled={disabled}
      />
    </View>
  );
};

const Product = ({ navigation, route }) => {
  const { handle } = route.params;
  const { product } = useFetchProduct(handle);

  return (
    <SafeAreaView style={styles.container}>
      {product ? (
        <ProductTemplate product={product} />
      ) : (
        <Text>Loading ...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  // template
  productComponent: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 'auto'
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  price: {
    fontSize: 20,
    fontWeigth: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default Product;
