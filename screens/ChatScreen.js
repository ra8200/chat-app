import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  StatusBar, 
  ScrollView, 
  TextInput,
  Pressable,
  Keyboard,
  Platform,
  SafeAreaView
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { db } from '../firebase'
import * as firebase from 'firebase';
import { collection, query, orderBy, onSnapshot, doc, Timestamp } from 'firebase/firestore';


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
              uri: 'https://vectorified.com/images/default-user-icon-34.png',
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

  // useLayoutEffect(() => {
  //   const messagesRef = collection(db, 'chats', route.params.id, 'messages');
  //   const q = query(messagesRef, orderBy('timestamp', 'desc'));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setMessages(snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })
  //   ))
  
  //   return unsubscribe;
  // }, [route]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput(''); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light"/>
      <KeyboardAvoidingView
        behavior= {Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <Pressable onPress={Keyboard.dismiss}>
          <>
            <ScrollView>{/* Chat Goes Here */}</ScrollView>
            <View style={styles.footer}>
              <TextInput 
                placeholder="Chatty Message"
                style={styles.textInput}
                onSubmitEditing={sendMessage}
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <Pressable onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </Pressable>
            </View>
          </>
        </Pressable> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  inner: {
    paddingTop: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
})