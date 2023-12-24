import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from '@rneui/themed';



const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

  return (
    <KeyboardAvoidingView
        behavior='padding'
        enabled 
        style={styles.container}
    >
        <StatusBar style='auto' />
        <Text h3 style={{ marginBottom: 50 }}>
            Create a Chatty Account
        </Text>

        <View style={styles.inputContainer}>
            <Input 
                placeholder='Full Name' 
                autoFocus 
                type='text'
                value={name}
                onChangeText={(text) => setName(text)} 
            />
            <Input 
                placeholder='Email' 
                type='email'
                value={email}
                onChangeText={(text) => setEmail(text)} 
            />
            <Input 
                placeholder='Password' 
                type='password'
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)} 
            />
            <Input 
                placeholder='Profile Picture URL (optional)'
                onChange={(imageUrl) => setImageUrl(imageUrl)}
            />
        </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    }
})