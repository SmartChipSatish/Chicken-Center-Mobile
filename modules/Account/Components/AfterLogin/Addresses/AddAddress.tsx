import { View, Text, ViewBase, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { saveAs } from '../../../utlis/constents'
import Location from './Location'
import { TEXT_COLORS, THEME_COLORS } from '../../../../GlobalStyles/GlobalStyles'
import { useDispatch } from 'react-redux'
import { setAddLocation } from '../../../Store/LocationSlice'

export default function AddAddress() {
  const [placeholderShow,setPlaceholderShow] =useState(false);
  const [address,setAddress] = useState({city:'',country:'',address:'',flat:''});
  const [checkData,setCheckData]=useState(false);
  const [mobileNo,setMobileNo]=useState('');
  const [saveType,setSaveType]=useState<string>('');
  const dispatch =useDispatch()
  const handleAddress=(location:any)=>{
   
   const flat=location?.address?.split(',')?.shift() || '';
  
   setAddress({city:location.city,country:location.country,address:location.address,flat:flat});
  }

  const handeleSave=()=>{ 
  
    if(checkData){
      dispatch(setAddLocation({...address,saveAs:saveType,mobileNo:mobileNo}));
    }
  }

  useEffect(()=>{
    if(mobileNo!=='' && address.city !=='' && address.country !=='' && address.address!=='' && address.flat!=='' && saveType!==''){
      setCheckData(true);
    }
  },[address,mobileNo,saveType])

  return (
    <ScrollView keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
      <View style={{ height: 300, width: '100%' }}>
        {/* <Text>Address</Text> */}
        <Location handleAddress={handleAddress}/>
      </View>

      <View style={Style.container}>
        <View style={{marginBottom:10,marginTop:10}}>
          {placeholderShow && <Text style={Style.side_header}>Enter Your apartment / building / area</Text>}
          <TextInput style={Style.textInput}
            placeholder='Enter Your apartment / building / area'
            value={address.address}
            onChangeText={(text)=>setAddress({...address,address:text})}
            onFocus={()=>setPlaceholderShow(true)}
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>Flat no. / House no. /Floor / Block</Text>
          <TextInput style={Style.textInput}
                     placeholder='Flat no. / House no. /Floor / Block'
                     value={address.flat}
                     onChangeText={(text)=>setAddress({...address,flat:text})}
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>Landmark (optional)</Text>
          <TextInput style={Style.textInput}
            placeholder='Landmark (optional)'
            // keyboardType="phone-pad"
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>City</Text>
          <TextInput style={Style.textInput}
            placeholder='City'
            value={address.city}
            onChangeText={(text)=>setAddress({...address,city:text})}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Mobile</Text>
          <TextInput style={Style.textInput}
            onChangeText={(text)=>setMobileNo(text)}
            placeholder='Mobile'
            keyboardType="phone-pad"
          />
        </View>

        <View>
        <Text style={Style.side_header}>Save as</Text>
        <View style={{flexDirection:'row',marginTop:5 }}>
          {saveAs.map((e,inedx)=>{
            return <TouchableOpacity style={[Style.savas_btn,{backgroundColor: saveType === e.title? `${THEME_COLORS.light_color}` : 'white'}]} 
                                     key={inedx} 
                                     onPress={()=>setSaveType(e.title)}>
                   <e.icon width={20} height={20} color={`${TEXT_COLORS.primary}`}/>
                   <Text style={{marginLeft:5}}>{e.title}</Text>
                   </TouchableOpacity>
          })}
        </View>
      </View>
      <TouchableOpacity style={[Style.save_btn,{backgroundColor:checkData? `${THEME_COLORS.secondary}`: `${THEME_COLORS.light_color}`}]} >
        <Text style={{color:'white'}} onPress={()=>handeleSave()}>Save</Text>
      </TouchableOpacity>
      </View>
      
     

    </ScrollView>
  )
}

const Style = StyleSheet.create({
  textInput: {
    height: 50,
    width: '90%',
    fontSize: 15,
    borderBottomWidth: 1,
    color:TEXT_COLORS.primary,
    borderBottomColor: `${TEXT_COLORS.primary}`
  },side_header:{
     color:TEXT_COLORS.primary,
     fontSize:15,
     fontWeight:'500'
  }, 
  savas_btn:{
    flexDirection:'row',
    borderWidth:1,
    padding:5,
    borderRadius:10,
    marginLeft:5,
    justifyContent:'space-between' 
   },
   save_btn:{
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:'100%',
    borderRadius:10,
    marginTop:50,
    marginBottom:10
   },
   container:{
    flex: 1,
    backgroundColor: THEME_COLORS.primary,
    height: '100%',
    padding:10,
    marginBottom:10,
    marginTop:20,
    width:'100%',
    borderTopEndRadius:30,
    borderTopLeftRadius:30
   }
})