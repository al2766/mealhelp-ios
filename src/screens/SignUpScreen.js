import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      customMessage = 'Passwords do not match';
      return;
    }
    try {
      await signUp(email, password, username);
      navigation.navigate('Home', { screen: 'Recipes' });
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
      <TextInput
        placeholder="User Name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
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
      <TextInput
        placeholder="Repeat password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
                    {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
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
  errorMessage: {
    marginTop: 10,
    color: 'red',
  },
});

export default SignUpScreen;
