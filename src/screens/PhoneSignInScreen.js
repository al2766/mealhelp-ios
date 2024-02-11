import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



function PhoneSignInScreen({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('07957196486');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const { signInWithPhone, confirmCode, loading, confirm } = useContext(AuthContext);

  const handleSendCode = async () => {
    try {
      await signInWithPhone(phoneNumber);
    } catch (error) {
      let customMessage;
      if (error.message.includes('email')) {
        customMessage = 'Invalid email.';
      } else if (error.message.includes('password')) {
        customMessage = 'Please enter a password.';
      } else if (error.message.includes('credential')) {
        customMessage = 'We cannot find an account with these details.';
      } else {

        customMessage = error.message;
        //customMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(customMessage);
    }
  };

  const handleConfirmCode = async () => {
    try {
      await confirmCode(code);
    }catch (error) {
      let customMessage;
      if (error.message.includes('email')) {
        customMessage = 'Invalid email.';
      } else if (error.message.includes('password')) {
        customMessage = 'Please enter a password.';
      } else if (error.message.includes('credential')) {
        customMessage = 'We cannot find an account with these details.';
      } else {

        customMessage = error.message;
        //customMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(customMessage);
    }
  };

  return (
    <View style={styles.container}>
      {!confirm ? (
        <>
        <SafeAreaView style={styles.backContainer}>
       
         <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonStyle}>
              <FontAwesome
            name="chevron-left"
            style={{color: '#58acbb', fontSize: 23}}
          />
          <Text style={styles.backButtonText}>
           Back
          </Text>
        </TouchableOpacity>
        </SafeAreaView>
          <Text style={styles.text}>Enter Phone Number</Text>
          <TextInput
            value={phoneNumber}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
            editable={!loading}
          />
                     {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={loading}>
  <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Code'}</Text>
</TouchableOpacity>

        </>
      ) : (
        <>
          <Text style={styles.text}>Enter OTP Code</Text>
          <TextInput
            value={code}
            placeholder="OTP"
            onChangeText={setCode}
            style={styles.input}
            keyboardType="number-pad"
            editable={!loading}
          />
           {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
         <TouchableOpacity style={styles.button}
            onPress={handleConfirmCode}
            disabled={loading}>
         <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>

            </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    width: '80%',
    marginVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#58acbb', // Adjust the color to match your theme
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#58acbb', // Adjust the color to match your theme
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    color: '#58acbb',
  },
  backButtonStyle: {
    display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center', 
  gap: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start', 
    top: 10,
    left: 10,
    paddingVertical: 10, // Increase padding vertically to make the buttons taller
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  backContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  marginHorizontal: 10,
  
  },
});


export default PhoneSignInScreen;
