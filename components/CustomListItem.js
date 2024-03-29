import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);


  useEffect(() => {
    const messagesRef = collection(db, 'chats', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChatMessages(snapshot.docs.map(doc => doc.data()));
    });

    return unsubscribe;
  }, [id]);

  // useEffect(() =>{
  //   const unsubscribe = db
  //     .collection('chats')
  //     .doc(id).collection('messages')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot(snapshot => 
  //       setChatMessages(snapshot.docs.map(doc => doc.data()))
  //     );
  //   return unsubscribe;
  // });

  return (
    <ListItem 
      key={id}
      onPress={() => enterChat(id, chatName)} 
      bottomDivider 
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages[0]?.photoURL ||
            'https://vectorified.com/images/default-user-icon-34.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
          {chatMessages[0]?.displayName}: {chatMessages[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})