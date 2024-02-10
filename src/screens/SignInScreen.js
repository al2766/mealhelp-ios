import React, { useState, useContext } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import {AuthContext} from '../context/AuthContext';


function SignInScreen({navigation}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);


  const handleSignIn = async () => {
    try {
      await signIn(email, password);

      navigation.navigate('Home');
        } catch (err) {
      const errorMessage = err.message;
    Alert.alert('Error', errorMessage);
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
      <Button title="Sign In" onPress={handleSignIn} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
      {/* <Button title="Sign In With Google" onPress={handleGoogleSignIn} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 5,
  },
});

export default SignInScreen;
