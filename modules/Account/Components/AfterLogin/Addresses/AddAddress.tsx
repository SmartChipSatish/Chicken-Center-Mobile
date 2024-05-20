import { View, Text, ViewBase, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { saveAs } from '../../../utlis/constents'
import Location from './Location'
import { TEXT_COLORS, THEME_COLORS } from '../../../../GlobalStyles/GlobalStyles'

export default function AddAddress() {
  const [placeholderShow,setPlaceholderShow] =useState(false);
  const [address,setAddress] = useState({city:'',country:'',address:'',flat:''})
  const [saveType,setSaveType]=useState<string>('');
  const handleAddress=(location:any)=>{
   console.log(location,'locations');
   const flat=location?.address?.split(',')?.shift() || '';
   console.log(flat,'flattt');
   setAddress({city:location.city,country:location.country,address:location.address,flat:flat});
  }
  console.log(saveType,'savetypr');
  return (
    <ScrollView keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
      <View style={{ height: 300, width: '100%' }}>
        {/* <Text>Address</Text> */}
        <Location handleAddress={handleAddress}/>
      </View>

      <View style={Style.container}>
        <View style={{marginBottom:10,marginTop:10}}>
          {placeholderShow && <Text>Enter Your apartment / building / area</Text>}
          <TextInput style={Style.textInput}
            placeholder='Enter Your apartment / building / area'
            value={address.address}
            onChangeText={(text)=>setAddress({...address,address:text})}
            onFocus={()=>setPlaceholderShow(true)}
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text>Flat no. / House no. /Floor / Block</Text>
          <TextInput style={Style.textInput}
                     placeholder='Flat no. / House no. /Floor / Block'
                     value={address.flat}
                     onChangeText={(text)=>setAddress({...address,flat:text})}
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text>Landmark (optional)</Text>
          <TextInput style={Style.textInput}
            placeholder='Landmark (optional)'
            // keyboardType="phone-pad"
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text>City</Text>
          <TextInput style={Style.textInput}
            placeholder='City'
            value={address.city}
            onChangeText={(text)=>setAddress({...address,city:text})}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Mobile</Text>
          <TextInput style={Style.textInput}
            placeholder='Mobile'
            keyboardType="phone-pad"
          />
        </View>

        <View>
        <Text>Save as</Text>
        <View style={{flexDirection:'row',marginTop:5 }}>
          {saveAs.map((e,inedx)=>{
            return <TouchableOpacity style={[Style.savas_btn,{backgroundColor: saveType === e.title? '#EA9A7E' : 'white'}]} 
                                     key={inedx} 
                                     onPress={()=>setSaveType(e.title)}>
                   <e.icon width={20} height={20} color={`${TEXT_COLORS.primary}`}/>
                   <Text style={{marginLeft:5}}>{e.title}</Text>
                   </TouchableOpacity>
          })}
        </View>
      </View>
      <TouchableOpacity style={Style.save_btn} >
        <Text style={{color:'white'}}>Save</Text>
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
    borderBottomColor: `${TEXT_COLORS.primary}`
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
    backgroundColor:`${THEME_COLORS.secondary}`,
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
    backgroundColor: '#fff',
    height: '100%',
    padding:10,
    marginBottom:10,
    marginTop:20,
    width:'100%',
    borderTopEndRadius:30,
    borderTopLeftRadius:30
   }
})