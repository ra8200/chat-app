import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from '@rneui/themed'
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { collection, addDoc } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: input
    }).then(() => {
      navigation.goBack();
    }).catch((error) => alert(error));
  };

  return (
    <View styles={styles.container} >
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
      />
      <Button 
        onPress={createChat} 
        title='Create new Chat' 
        buttonStyle={{
          backgroundColor: '#2C6BED'
        }}
      />
    </View>
  );
};

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  }
});