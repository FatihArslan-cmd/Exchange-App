import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CurrencyScreen from './Screens/CurrencyScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import NewsScreen from './Screens/NewsScreen';
import CoinsScreen from './Screens/coinsScreen';
import FavoriesScreen from './Screens/FavoriesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./assets/icons8-home-50.png')
                : require('./assets/icons8-home-50 (1).png');
            } else if (route.name === 'Settings') {
              iconName = focused
                ? require('./assets/icons8-settings-50 (1).png')
                : require('./assets/icons8-settings-50.png');
            } else if (route.name === 'News') {
              iconName = focused
                ? require('./assets/icons8-news-50 (3).png')
                : require('./assets/icons8-news-50 (2).png');
            }
            return <Image source={iconName} style={{ width: 20, height: 20 }} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray', tabBarStyle: { display: 'flex' } }}
        />
        <Tab.Screen
          name="CurrencyScreen"
          component={CurrencyScreen}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }} />,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{ headerShown: false, tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray', tabBarStyle: { display: 'flex' } }}
        />
        <Tab.Screen
          name="CoinsScreen"
          component={CoinsScreen}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }} />,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="FavoriesScreen"
          component={FavoriesScreen}
          options={{
            headerShown: false,
            tabBarButton: () => <View style={{ width: 0, height: 0 }} />,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false, tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray', tabBarStyle: { display: 'flex' } }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
