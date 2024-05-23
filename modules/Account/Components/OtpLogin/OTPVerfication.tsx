import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TEXT_COLORS, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function OTPVerfication({ navigation, route }:any) {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs:any[] = [];
  const [timer,setTimer]=useState(60);

  const handleInputChange = (index:number, value:any) => {
    if (isNaN(value)) {
      return; // Only allow numeric characters
    }

    const newOTP = [...otp];
    newOTP[index] = value;

    setOTP(newOTP);

    if (value && index < 5) {
      inputRefs[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1]?.focus();
    }
  };
 
  const handleSubmit=async()=>{
    const OTP = otp.join('');
    if(OTP.length >= 6){
      try{
        const res=await route.params.data.confirm(otp.join(''));
        console.log(res,'respones')
        if(res){
          AsyncStorage.setItem('login','true');
          navigation.navigate('home');
        }
       }catch(error){
        console.log(error,'error')
       }
    }else{
     Alert.alert("Please enter a valid OTP")
    }
    
  }

  useEffect(()=>{
   setTimeout(()=>{
    if(timer === 0){
      return
    }else{
      setTimer(timer-1);
    }
   },1000)
  },[timer])

  return (
    <View style={OTPVericationCSS.container}>

      <TouchableOpacity style={{marginTop:20,marginBottom:10}} onPress={()=>navigation.goBack()}>
      <Ionicons name='chevron-back' size={30} color={`${TEXT_COLORS.primary}`}/>
      </TouchableOpacity>

        <Text style={OTPVericationCSS.mainText}>Verify via OTP</Text>
        <Text style={{fontSize:14}}>Enter the OTP sent to You on {route.params.number}</Text>

        <View style={OTPVericationCSS.OTP_inputes}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={OTPVericationCSS.input}
            value={value}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleInputChange(index, text)}
            ref={(ref) => {
              inputRefs[index] = ref;
            }}
          />
        ))}
        </View>
          <View style={OTPVericationCSS.timer_container}>
          <Text>Didn't receive the OTP?</Text>
          {timer !==0 &&<Text>Resend: { timer }</Text>}
          {timer ===0 && <TouchableOpacity onPress={()=>setTimer(60)}>
                          <Text>Resend : Send</Text>
                         </TouchableOpacity>}
          </View>
        

  <View style={OTPVericationCSS.footer_container}>
          <Text >By continuing you agree to our Terms & Conditions</Text>
          <TouchableOpacity style={OTPVericationCSS.continue_btn} onPress={handleSubmit}>
            <Text style={{color:'white',fontSize:18}}>Continue</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const OTPVericationCSS=StyleSheet.create({
  container:{
    flex: 1, 
    paddingBottom: 20,
    marginLeft:5,
    marginRight:5
  },
  mainText:{
    fontSize:25,
    marginBottom:5
  },
  timer_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5
  },
  footer_container:{ 
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    // backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 20,
  },
  continue_btn:{
    backgroundColor:`${THEME_COLORS.secondary}`,
    borderRadius:8,
    height:40,
    width:'90%',
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
  },
  input: {
    borderColor: `${TEXT_COLORS.primary}`,
    width: 40,
    height: 50,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    borderBottomWidth:1
  },
  OTP_inputes:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  }
  
})
