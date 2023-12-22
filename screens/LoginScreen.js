import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Input, Image } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
  return (
    <View>
      <StatusBar style='light' />
      <Image 
        source={{
          uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        }}
        style={{ width: 200, height: 200 }} 
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});