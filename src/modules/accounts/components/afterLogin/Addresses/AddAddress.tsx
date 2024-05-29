import { View, Text, ViewBase, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { saveAs } from '../../../utlis/constents'
import Location from './Location'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateAddressMutation } from './store/AddressEndpoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../../../../store/store'
import { TEXT_COLORS, THEME_COLORS } from '../../../../../globalStyle/GlobalStyles'

export default function AddAddress() {
  const navigation = useNavigation<any>();
  const userLatitudes=useSelector((store: RootState)=>store.locations.latitudes)
  const userLongitudes=useSelector((store: RootState)=>store.locations.longitudes);
  const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
  const [addAddress] = useCreateAddressMutation();
  const [placeholderShow,setPlaceholderShow] =useState(false);
  const [address,setAddress] = useState({city:'',country:'',address:'',flat:'',pincode:"",street:'',state:''});
  const [checkData,setCheckData]=useState(false);
  const [saveType,setSaveType]=useState<string>('');
  const [button,setbutton]=useState<any>([])
  const [landmark,setlandmark]=useState("")
  const [mobile,setmobile]=useState("")
  const dispatch =useDispatch()
  const handleAddress=(location:any)=>{
   const flat=location?.address?.split(',')?.shift() || '';
  
   setAddress({city:location.city,country:location.country,address:location.address,flat:flat,pincode:location.pincode,street:location.street,state:location.state});
  }

  // const handeleSave=()=>{ 
  
  //   if(checkData){
  //     dispatch(setAddLocation({...address,saveAs:saveType}));
  //     Alert.alert('Address added');
  //   }else{
  //     Alert.alert('Enter all details');
  //   }
  // }

  useEffect(()=>{
    if( address.city !=='' && address.country !=='' && address.address!=='' && address.flat!=='' && address.state!=='' && address.street!=='' && address.pincode!=='' && saveType!==''){
      setCheckData(true);
    }
  },[address,saveType])


  const createAllAddresses = async (status:boolean) => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    console.log(userId,"userId")
    let dataTosend = {
      name:address.address,
      houseNo:address.flat,
      city:address.city,
      pincode:Number(address.pincode),
      landmark: landmark,
      state: address.state,
      location:{coordinates:  [userLatitudes, userLongitudes]},
      mobile:Number(mobile),
      status:status, 
    };
    

    try {
        let savedData = await addAddress({id:userId,user:dataTosend}).unwrap();
        navigation.navigate("addresses")
       
    } catch (error) {
        console.log(error);
    }

};


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
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>

        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>Flat no. / House no. /Floor / Block</Text>
          <TextInput style={Style.textInput}
                     placeholder='Flat no. / House no. /Floor / Block'
                     value={address.flat}
                     onChangeText={(text)=>setAddress({...address,flat:text})}
                     placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Landmark</Text>
          <TextInput style={Style.textInput}
           value={landmark}
            onChangeText={(text)=>setlandmark(text)}
            placeholder='Landmark'
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>City</Text>
          <TextInput style={Style.textInput}
            placeholder='City'
            value={address.city}
            onChangeText={(text)=>setAddress({...address,city:text})}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        <View style={{marginBottom:10}}>
        <Text style={Style.side_header}>State</Text>
          <TextInput style={Style.textInput}
            placeholder='State'
            value={address.state}
            onChangeText={(text)=>setAddress({...address,state:text})}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Pincode</Text>
          <TextInput style={Style.textInput}
           value={address.pincode}
            onChangeText={(text)=>setAddress({...address,pincode:text})}
            placeholder='Pincode'
            keyboardType="phone-pad"
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Mobile</Text>
          <TextInput style={Style.textInput}
           value={mobile}
            onChangeText={(e)=>setmobile(e)}
            placeholder='Mobile'
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>

        

        <View>
        <Text style={Style.side_header}>Save as</Text>
        <View style={{flexDirection:'row',marginTop:5 }}>
          {saveAs.map((e,inedx)=>{
            return <TouchableOpacity style={[Style.savas_btn,{backgroundColor: saveType === e.title? `${THEME_COLORS.light_color}` : 'white'}]} 
                                     key={inedx} 
                                     onPress={()=> {setSaveType(e.title); setbutton(e)}}>
                   <e.icon width={20} height={20} color={`${TEXT_COLORS.primary}`}/>
                   <Text  style={{marginLeft:5,color:"black"}}>{e.title}</Text>
                   </TouchableOpacity>
          })}
        </View>
      </View>
      <TouchableOpacity style={[Style.save_btn,{backgroundColor:checkData? `${THEME_COLORS.secondary}`: `${THEME_COLORS.light_color}`}]} >
        <Text style={{color:'white'}} onPress={()=>{createAllAddresses(true)}}>Save</Text>
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