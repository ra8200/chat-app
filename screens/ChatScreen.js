import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base/dist/Avatar/Avatar'
import { Pressable } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { db } from '../firebase'

const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Avatar 
            rounded 
            source={{
              uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            }} 
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700"
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft"
          size={24} color='white' />
        </Pressable>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20
          }}
        >
          <Pressable>
            <FontAwesome name="video-camera" size={24} color="white" />
          </Pressable>
          <Pressable>
            <Ionicons name="call" size={24} color="white" />
          </Pressable>
        </View>
      )
    })
  }, [navigation, messages])

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ))

    return unsubscribe;
  }, [route])

  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})