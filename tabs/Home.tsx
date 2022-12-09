import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import { Collection, Product } from '../screens';

const Home = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Collection">
      <Stack.Screen
        name="Collection"
        component={Collection}
        initialParams={{ handle: 'mens-hair' }}
        options={{
          title: 'Collection',
          headerStyle: {
            backgroundColor: '#ffffff'
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          title: 'Product',
          headerStyle: {
            backgroundColor: '#ffffff'
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;
