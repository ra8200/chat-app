import { 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  View, 
  Pressable 
} from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { Avatar } from '@rneui/themed'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, query, onSnapshot } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  useEffect(() => {
    const q = query(collection(db, 'chats'));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setChats(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    ); 
  
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chatty",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Pressable onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
          <Pressable activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </Pressable>
          <Pressable
          onPress={() => navigation.navigate("AddChat")}
          activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);
  
  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({id, data: { chatName }}) => (
          <CustomListItem key={id} id={id} chatName={chatName} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
})