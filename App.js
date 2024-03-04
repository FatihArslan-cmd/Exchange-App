import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import NewsScreen from './NewsScreen'
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
            }
            else if (route.name === 'News') {
              iconName = focused
                ? require('./assets/icons8-news-50 (3).png')
                : require('./assets/icons8-news-50 (2).png');
            }
            return <Image source={iconName} style={{ width: 20, height: 20 }} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
