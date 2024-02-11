import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import PhoneSignInScreen from '../screens/PhoneSignInScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
        screenOptions={{
          headerShown: false, // This will hide the header globally for all screens
        }}
      >
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="PhoneSignInScreen" component={PhoneSignInScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthNavigator;
