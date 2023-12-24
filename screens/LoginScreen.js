import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Button, Input, Image } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({ navigation }) => {  // We can access navigation from props. this is what you need to navigate to another screen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    // some sign in logic...
  };

  return (
    <KeyboardAvoidingView 
      behavior='padding'
      enabled 
      style={styles.container}
    >
      <StatusBar style='auto' />
      <Image 
        source={require('../assets/logo.png')}
        alt='Logo'
        style={styles.logo} 
      />
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Email' 
          autoFocus 
          type='email' 
          value={email} 
          onChange={(text) => setEmail(text)}
          style={styles.input}
        />
        <Input 
          placeholder='Password' 
          secureTextEntry 
          type='password' 
          value={password} 
          onChange={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <Button 
        containerStyle={styles.button}
        onPress={signIn}  
        title='Login'
        buttonStyle={{
          backgroundColor: '#2C6BED'
        }} 
      />
      <Button 
        containerStyle={styles.button} 
        type='outline'
        onPress={() => navigation.navigate('Register')}  // This is how we navigate to another screen
        title='Register'
        color={{
          color: '#2C6BED'
        }}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 250,
    marginTop: 10,
    borderRadius: 10,
  },
  inputContainer: {
    width: 300,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  input: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
});