import React, { useState, useContext } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import {AuthContext} from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



function SignInScreen({navigation}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {signIn} = useContext(AuthContext);



  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigation.navigate('Home');
    } catch (error) {
      let customMessage;
      if (error.message.includes('email')) {
        customMessage = 'Invalid email.';
      } else if (error.message.includes('password')) {
        customMessage = 'Please enter a password.';
      } else if (error.message.includes('credential')) {
        customMessage = 'We cannot find an account with these details.';
      } else {

        //customMessage = error.message;
        customMessage = 'An unexpected error occurred. Please try again.';
      }
      setError(customMessage);
    }
  };
  return (
    <View style={styles.container}>
   
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>      
      {/* Phone Sign In Button */}
      <TouchableOpacity style={styles.wideButton} onPress={() => navigation.navigate('PhoneSignIn')}>
        <FontAwesome name="mobile" style={styles.iconStyle} />
        <Text style={styles.wideButtonText}>Sign in with phone number</Text>
      </TouchableOpacity>

      {/* Placeholder for Apple Sign In Button */}
      <TouchableOpacity style={styles.wideButton} onPress={() => {/* Future Apple sign-in implementation */}}>
        <FontAwesome name="apple" style={styles.iconStyle} />
        <Text style={styles.wideButtonText}>Sign in with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // or any color that matches your design
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      width: '80%',
      marginVertical: 10,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 20,
      fontSize: 16,
    },
    button: {
      width: '80%',
      backgroundColor: '#58acbb', // Choose your color
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      margin: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    signUpText: {
      color: '#000', // Adjust as needed
      fontSize: 14,
      marginTop: 20,
    },
    signUpLink: {
      fontWeight: 'bold',
      color: '#000', // Adjust as needed
      fontSize: 16
    },
    phoneButton: {
      
     marginTop: 50
    },
    icon: {
      width: 44,
      height: 44, // Adjust size as needed
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#D3D3D3', // or any color that fits your design
    },
    orText: {
      width: 50, // You can adjust the width
      textAlign: 'center',
      color: '#000', // Adjust as needed
      fontSize: 16,
      marginHorizontal: 10, // Spacing on both sides of the text
    },
    socialLoginContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '60%', // Adjust the width as needed
    },
    iconButton: {
    },
    icon: {
   
      width: 40, // Adjust size as needed
      height: 40, // Adjust size as needed
    },
    forgotPassword: {
     
    color: '#0000EE',
    },
    errorMessage: {
      marginTop: 10,
      color: 'red',
    },

    wideButton: {
      flexDirection: 'row',
      justifyContent: 'flex-start', // Align icon to the left and text to start after the icon
      alignItems: 'center', // Center them vertically
      backgroundColor: '#fff', // White background or any other color
      paddingVertical: 15, // Vertical padding
      paddingHorizontal: 20, // Horizontal padding
      borderRadius: 30, // Rounded corners
      borderWidth: 1, // Border width
      borderColor: '#ddd', // Border color
      width: '80%', // Match width to your other elements
      marginTop: 10, // Margin top
      shadowColor: '#000', // Shadow color
      shadowOffset: { width: 0, height: 1 }, // Shadow offset
      shadowOpacity: 0.2, // Shadow opacity
      shadowRadius: 1.41, // Shadow radius
      elevation: 2, // Elevation for Android
      marginBottom: 10, // Margin bottom
    },
    wideButtonText: {
      fontSize: 18, // Font size
      marginLeft: 10, // Space between icon and text
      textAlign: 'center', // Center text
      flex: 1, // Take the available space after the icon
    },
    iconStyle: {
      fontSize: 24, // Icon size
      color: '#000', // Icon color
      // Adjust the padding to push the icon to the left edge
      paddingRight: 10,
    },
    
    
  });
  
  export default SignInScreen;
  