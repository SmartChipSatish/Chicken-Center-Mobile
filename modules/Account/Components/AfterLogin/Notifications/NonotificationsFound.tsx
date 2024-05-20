import { View, Text } from 'react-native'
import React from 'react'
import { NoNotificationsIcon } from '../../../../assets/svgimages/AccountsSvgs/NoNotificationsFoundIcon'

export default function NonotificationsFound() {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <NoNotificationsIcon/>
      <Text style={{color:'black',fontSize:15}}>No Notifications Yet !</Text>
    </View>
  )
}