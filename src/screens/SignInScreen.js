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
        onPress={() => navigation.navigate('ForgotPassword')} // Replace with your ForgotPassword screen
      >
        Forgot Password?
      </Text>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
        <Text style={styles.orText}>OR</Text>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('PhoneSignIn')}>
          {/* Replace with your phone icon image */}
          <Image source={require('../assets/img/phone-icon.jpeg')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* Future Apple sign-in implementation */}}>
          {/* Placeholder Apple icon */}
          <Image source={require('../assets/img/apple-icon.jpg')} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
    orText: {
      marginTop: 20,
      marginBottom: 20,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000', // Adjust as needed
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
    
  });
  
  export default SignInScreen;
  