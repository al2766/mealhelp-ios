// src/navigation/AppNavigator.js
import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import PhoneSignInScreen from '../screens/PhoneSignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import TabNavigator from './TabNavigator';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    // Bootstrap async function to check for token, etc.
    // For example, checking SecureStore for a token
    // Then dispatching 'RESTORE_TOKEN' with the token if found
  }, [userToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // This will hide the header globally for all screens
        }}>
        {userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="PhoneSignIn" component={PhoneSignInScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          </>
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
