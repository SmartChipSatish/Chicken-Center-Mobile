import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import GlobalOrders from '../../Orders/GlobalOrders'
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../../GlobalStyles/GlobalStyles'

export default function Orders() {
  return (
    <View style={styles.ordersBackGroudnd}>
      <Text style={styles.ordersHistory}>Your orders</Text>
      <View style={styles.text}></View>
      <View style={{marginTop:10}}></View>
      <GlobalOrders></GlobalOrders>
    </View>
  )
}

const styles=StyleSheet.create({
  PastOrders:{
    color:TEXT_COLORS.primary,
    fontSize:25,
    fontWeight:"bold",
    marginLeft:16,
    marginTop:10
  
  },
  text: {
    fontSize: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginTop:10
     
  },
  ordersHistory:{
    color:TEXT_COLORS.primary,
    // fontWeight:"bold",
    textAlign:"center",
    fontSize:20,
    marginTop:20,
    fontWeight:"bold"
  },
  ordersBackGroudnd:{
    backgroundColor:THEME_COLORS.primary,
    height:"100%"
  }
  
})