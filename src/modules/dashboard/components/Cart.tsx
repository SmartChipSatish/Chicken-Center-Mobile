import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Cartitems from '../../home/components/cart/CartItems'
import { TEXT_COLORS } from '../../../globalStyle/GlobalStyles'

export default function Cart() {
  return (
    <View>
      <View style={style.header}>
        <Text style={style.header_title}>Cart</Text>
      </View>
      <Cartitems></Cartitems>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: '0%',
  }, header_title: {
    color: TEXT_COLORS.primary,
    fontSize: 18,
    fontWeight:'bold',
    marginLeft:'2%'
  }
})