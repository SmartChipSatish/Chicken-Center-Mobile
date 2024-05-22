import { View, Text } from 'react-native'
import React from 'react'
import { TEXT_COLORS } from '../../../../GlobalStyles/GlobalStyles'

export default function NoTransaction() {
  return (
    <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
      <Text style={{fontSize:20,color:`${TEXT_COLORS.primary}`}}>No Transaction History</Text>
      <Text style={{fontSize:15,color:`${TEXT_COLORS.primary}`,marginTop:20}}>You have not made any Transactions Yet</Text>
    </View>
  )
}