import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';



function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp}  = useContext(AuthContext);

// Inside your SignUpScreen component
const handleSignUp = async () => {
  try {
    await signUp(email, password);
     //If signUp is successful and you need to navigate
    navigation.navigate('MainTabs', { screen: 'Recipes' });
  } catch (error) {
    Alert.alert('Error', error.message);
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
      <Button title="Sign Up" onPress={handleSignUp} />
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

export default SignUpScreen;
