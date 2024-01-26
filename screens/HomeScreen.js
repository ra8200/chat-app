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

const HomeScreen = ({ navigation }) => {

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

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
        <CustomListItem />
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