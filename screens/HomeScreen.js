import { 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  View, 
  TouchableOpacity 
} from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { Avatar } from '@rneui/themed'

const HomeScreen = ({ navigation }) => {
 useLayoutEffect(() => {
   navigation.setOptions({
     title: "Chatty",
     headerStyle: { backgroundColor: "#fff" },
     headerTitleStyle: { color: "black" },
     headerTintColor: "black",
     headerLeft: () => (
       <View style={{ marginLeft: 20 }}>
         <TouchableOpacity>
           <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
         </TouchableOpacity>
       </View>
     ),
   });
  }, []);
  
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