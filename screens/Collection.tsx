import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useFetchCollection } from '../hooks/useFetchCollection';
import { Image } from '../components';

const Product = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.product}>
    <View style={styles.image}>
      <Image src={item.featuredImage.src} />
    </View>
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        Starting at ${item.priceRange.minVariantPrice.amount}
      </Text>
    </View>
  </TouchableOpacity>
);

const Collection = ({ navigation, route }) => {
  const { handle } = route.params;
  const { products } = useFetchCollection(handle);
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Product
        item={item.node}
        // onPress={() => setSelectedId(item.node.id)}
        onPress={() =>
          navigation.navigate('Product', {
            handle: item.node.handle
          })
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
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
  price: {
    fontSize: 16
  }
});

export default Collection;
