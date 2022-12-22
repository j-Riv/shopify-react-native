import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StripeProvider } from '@stripe/stripe-react-native';

import { CartProvider } from './components/';
import { fetchKey } from './utils';
// screens
import { Home, Cart } from './tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const [publishableKey, setPublishableKey] = useState<string>('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey={publishableKey}
        // merchantIdentifier="merchant.identifier" // required for Apple Pay
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <CartProvider>
          <Tab.Navigator
            screenOptions={{
              // headerShown: false,
              tabBarActiveTintColor: '#ffffff',
              tabBarStyle: {
                backgroundColor: '#bc360a'
              }
            }}
            initialRouteName="Home"
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                )
              }}
            />
            <Tab.Screen
              name="Cart"
              component={Cart}
              options={{
                // headerShown: false,
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="cart"
                    color={color}
                    size={size}
                  />
                )
              }}
            />
          </Tab.Navigator>
        </CartProvider>
      </StripeProvider>
    </NavigationContainer>
  );
}
