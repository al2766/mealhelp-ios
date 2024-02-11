import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

function ProfileScreen() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: user ? user.photoURL : 'https://via.placeholder.com/150' }} // Replace with user's avatar image if available
      />
      <Text style={styles.name}>{user ? user.uuid : 'User Name'}</Text>
      <Text style={styles.email}>{user ? user.email : 'user@example.com'}</Text>
      <TouchableOpacity style={styles.button} onPress= {signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;
