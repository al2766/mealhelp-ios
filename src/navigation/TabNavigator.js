import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipesScreen from '../screens/RecipesScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AuthContext } from '../context/AuthContext';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { signOut, authState } = React.useContext(AuthContext);

  return (
    <Tab.Navigator

    screenOptions={{
      headerShown: false, // This will hide the header globally for all screens
    }}
  >
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Shopping" component={ShoppingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
