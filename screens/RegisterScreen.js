import { KeyboardAvoidingView, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Input } from '@rneui/themed';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Login',
        });
    }, [navigation]);

    const av = new Animated.Value(0);
    av.addListener(() => {return});
                              
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name,
                photoURL: imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            })
            .then(() => {
                navigation.replace('Home');
                alert("User created successfully!")
            }).catch((error) => {});
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
    };   

  return (
    <KeyboardAvoidingView
        behavior='padding'
        enabled 
        style={styles.container}
    >
        <StatusBar style='auto' />
        <Text style={styles.create}>
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
                type='text'
                value={imageUrl}
                onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                onSubmitEditing={register}
            />
        </View>
        <Button 
            containerStyle={styles.button} 
            raised 
            onPress={register}
            title='Register'
            buttonStyle={{
                backgroundColor: '#2C6BED'
            }}
        />
        <View style={{ height: 100 }} />    
        
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
    },
    button: {
        width: 200,
        marginTop: 10,
        borderRadius: 20,
    },
    create: {
        marginBottom: 30,
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
});