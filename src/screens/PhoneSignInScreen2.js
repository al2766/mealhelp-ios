import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../firebase/firebaseConfig'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, sendPasswordResetEmail } from "firebase/auth";

function PhoneSignInScreen({navigation}) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

function onAuthStateChanged(user) {
  if (user) {
    // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  }
}

useEffect(() => {
  const subscriber = onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

// Corrected function
async function signInWithPhone(phoneNumber) {
  try {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber); // Notice the auth parameter here which refers to your Firebase auth instance
    setConfirm(confirmation);
  } catch (error) {
    console.log('Error signing in with phone number:', error);
  }
}


async function confirmCode() {
  try {
    await confirm.confirm(code);
  } catch (error) {
    console.log('Invalid code.');
  }
}

if (!confirm) {
  return (
    <View style={styles.container}>

    <Button
      title="Phone Number Sign In"
      onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
    />
    </View>
  );
}

return (
  <View style={styles.container}>
  <TextInput value={code} onChangeText={text => setCode(text)} />
    <Button title="Confirm Code" onPress={() => confirmCode()} />
  </View>
);
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});

export default PhoneSignInScreen;