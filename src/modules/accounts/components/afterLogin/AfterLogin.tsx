import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ForwardArrowIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { afterLoginDetails } from '../../utlis/constents'
import { style } from '../../utlis/Styles';
import { useNavigation } from '@react-navigation/native';

export default function AfterLogin() {
  const navigate=useNavigation<any>()
  return (
    <View style={style.container}>

      {afterLoginDetails.map((e,index)=>{
        return <TouchableOpacity onPress={()=>navigate.navigate(`${e.navigation}`,{title:e.title})}
                                 style={[style.details_container,{borderBottomWidth:(index === afterLoginDetails.length-1)? 0: 1}]} 
                                 key={index}>
        <View style={{marginBottom:15}}>
          <e.icon width={35} height={35} color={'gray'}/>
        </View>
        <View style={{width:'80%',marginLeft:5,marginBottom:15}}>
          <Text style={style.title}>{e.title}</Text>
          <Text style={style.discription}>{e.content}</Text>
          </View>
          <View style={{marginBottom:15}}>
          <ForwardArrowIcon/>
          </View>
      </TouchableOpacity>
      })}
    </View>
  )
}



