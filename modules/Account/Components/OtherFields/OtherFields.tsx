import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { AnnouncementMicIcon, ForwardArrowIcon } from '../../../assets/svgimages/AccountsSvgs/accountsSvgs'
import { details } from '../../utlis/constents';
import { style } from '../../utlis/Styles';
import { useNavigation } from '@react-navigation/native';

export default function OtherFields() {
  const navigation=useNavigation<any>()
  return (
    <View style={style.container}>

      {details.map((e, index) => {
        return <>
        <TouchableOpacity style={[style.details_container, { borderBottomWidth: (index === details.length - 1 || index === 0) ? 0 : 1 }]} 
                          key={index}
                          onPress={()=>navigation.navigate(e.navigation)}>
          <View style={{ marginBottom: 15 }}>
            <e.Icon />
          </View>
          <View style={{ width: '80%', marginLeft: 5, marginBottom: 15 }}>
            <Text style={style.title}>{e.title}</Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <ForwardArrowIcon />
          </View>
        </TouchableOpacity>
          {e.title === 'Contact Us' && <View style={style.referAFriend} key={index}>
            <AnnouncementMicIcon/>
            <View style={{marginLeft:10}}>
            <Text style={style.referText}>Refer a friend</Text>
            <Text style={style.referText}>Invite friends and get Rs 200 per referral</Text>
            </View>
          </View>}
        </>
      })}
    </View>
  )
}
