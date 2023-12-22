import { StyleSheet, View, ViewBase } from 'react-native';
import React from 'react';
import { Button, Input, Image } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <StatusBar style='light' />
      <Image 
        source={require('../assets/2.png')}
        alt='Logo'
        style={{ width: 200, height: 200 }} 
      />
      <View style={styles.inputContainer}>
        <Input 

        
          placeholder='Email' 
          autoFocus type='email' 
          value={email} 
          onChange={(text) => setEmail(text)} 
        />
        <Input 
          placeholder='Password' 
          secureTextEntry type='password' 
          value={password} 
          onChange={(text) => setPassword(text)} 
        />
      </View>
      <Button title='Login' />
      <Button title='Register' type='outline' />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {

  },
});