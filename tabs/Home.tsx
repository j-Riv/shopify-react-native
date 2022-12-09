import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import { Collection, Product } from '../screens';

// const Home = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Collection"
//         onPress={() =>
//           navigation.navigate('Collection', { handle: 'mens-hair' })
//         }
//       />
//     </View>
//   );
// };

const Home = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Collection">
      <Stack.Screen
        name="Collection"
        component={Collection}
        initialParams={{ handle: 'mens-hair' }}
      />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};

export default Home;
