import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from '@rneui/themed'

const CustomListItem = ( id, chatName, enterChat ) => {
  return (
    <ListItem key={id} bottomDivider >
      <Avatar
        rounded
        source={{
          uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
          ABC
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})