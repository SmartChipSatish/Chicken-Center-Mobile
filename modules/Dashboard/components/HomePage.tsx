import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import HeaderLocation from '../../location/HeaderLocation'


export default function HomePage() {
  return (
    <View style={styles.HomePageBackground}>
        <HeaderLocation></HeaderLocation>
    </View>
  )
}
const styles = StyleSheet.create({
  HomePageBackground:{
    backgroundColor:"white",
    height:"100%"
  }

})
