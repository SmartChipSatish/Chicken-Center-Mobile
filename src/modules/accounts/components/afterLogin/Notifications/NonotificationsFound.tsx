import { View, Text } from 'react-native'
import React from 'react'
import { NoNotificationsIcon } from '../../../../../assets/svgimages/AccountsSvgs/NoNotificationsFoundIcon'
import { TEXT_COLORS } from '../../../../../globalStyle/GlobalStyles'

export default function NonotificationsFound() {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <NoNotificationsIcon/>
      <Text style={{color:`${TEXT_COLORS.primary}`,fontSize:15}}>No Notifications Yet !</Text>
    </View>
  )
}