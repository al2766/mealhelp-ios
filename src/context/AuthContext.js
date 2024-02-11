// AuthContext.js
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/firebaseConfig'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, sendPasswordResetEmail } from "firebase/auth";




export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...state, isSignout: false, userToken: action.token };
    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'SIGN_IN', token: user.uid });
      } else {
        dispatch({ type: 'SIGN_OUT' });
      }
    });
    return unsubscribe;
  }, []);


  const signInWithPhone = async (phoneNumber) => {
    setLoading(true);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
     
      setLoading(false);
      throw error; 
    }
  };

const confirmCode = async (verificationCode) => {
  if (!confirm) {
    Alert.alert('Error', 'No confirmation code available');
    return;
  }
  setLoading(true);
  try {
    await confirm.confirm(verificationCode); // Use the confirmation result to verify the code.
    // Navigate or update state as needed after successful confirmation
  } catch (error) { 
    setLoading(false);
    throw error; 
   
  }
  
};

  

   const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: 'SIGN_IN', token: user.uid });
      // Do not navigate here; instead, handle navigation in the component
    } catch (error) {
      // Handle errors such as email already in use, invalid email, etc.
      throw error; // Throw the error to be caught in the component
    }
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: 'SIGN_OUT' });
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: 'SIGN_IN', token: user.uid });
      // Do not navigate here; instead, handle navigation in the component
    } catch (error) {
      // Handle errors such as email already in use, invalid email, etc.
      throw error; // Throw the error to be caught in the component
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };
  

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, signUp, signInWithPhone, confirmCode, forgotPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
