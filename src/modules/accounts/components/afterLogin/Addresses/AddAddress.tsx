import { View, Text, ViewBase, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { saveAs } from '../../../utlis/constents'
import Location from './Location'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateAddressMutation, useGetAddressByuserMutation } from './store/AddressEndpoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../../../../store/store'
import { TEXT_COLORS, THEME_COLORS } from '../../../../../globalStyle/GlobalStyles'
import { setDisplayAddressAll } from '../../../store/slices/LocationSlice'
import { useFocusEffect } from '@react-navigation/native';

export default function AddAddress() {
  console.log(saveAs,"saveAs-----")
  const navigation = useNavigation<any>();
  const userLatitudes = useSelector((store: RootState) => store.locations.latitudes)
  const userLongitudes = useSelector((store: RootState) => store.locations.longitudes);
  const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
  const [addAddress] = useCreateAddressMutation();
  const [placeholderShow, setPlaceholderShow] = useState(false);
  const [address, setAddress] = useState({ city: '', country: '', address: '', flat: '', pincode: "", street: '', state: '' });
  const [checkData, setCheckData] = useState(false);
  const [saveType, setSaveType] = useState<string>('');
  const [button, setbutton] = useState<any>([])
  const [landmark, setlandmark] = useState("")
  const [mobile, setmobile] = useState("")
  const dispatch = useDispatch()
  const [notifyname, setnotifyname] = useState(false)
  const [notifyLand, setnotifyLand] = useState(false)
  const [citynotify, setcitynotify] = useState(false)
  const [statenotify, setstatenotify] = useState(false)
  const [mobilenotify, setmobilenotify] = useState(false)
  const [getAddressByUser] = useGetAddressByuserMutation()
  const [alltheAddress, setAllTheAddress] = useState<any>([]);
  const handleAddress = (location: any) => {
    const flat = location?.address?.split(',')?.shift() || '';
    setAddress({ city: location.city, country: location.country, address: location.address, flat: flat, pincode: location.pincode, street: location.street, state: location.state });
  }
  useEffect(() => {
    if (address.city !== '' && address.country !== '' && address.address !== '' && address.flat !== '' && address.state !== '' && address.street !== '' && address.pincode !== '' && saveType !== '') {
      setCheckData(true);
    }
  }, [address, saveType])


  const createAllAddresses = async (status: boolean) => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    console.log(userId, "userId")
    let dataTosend = {
      name: address?.address,
      houseNo: address?.flat,
      city: address?.city,
      pincode: Number(address?.pincode),
      landmark: landmark,
      state: address?.state,
      location: { coordinates: [userLatitudes, userLongitudes] },
      mobile: Number(mobile),
      status: status,
    };


    try {
      if (address.address && address.flat && landmark && address.city && address.state && address.pincode) {

        try {
          const savedData = await addAddress({ id: userId, user: dataTosend }).unwrap();
          console.log(savedData, 'saveddata');
          // Alert.alert("Successfully added address");
          getAllAddresses();
          navigation.navigate("checkout",{name:"name"});
          setmobile('');
          setlandmark('');
        } catch (apiError) {
          console.error('API call failed:', apiError);

        }

      }
      else {
        Alert.alert("Enter all the fields...")
        
      }


    } catch (error) {
      console.log(error);
    }

  };


  const getAllAddresses = async () => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    try {
      const getData = await getAddressByUser(userId).unwrap();

      setAllTheAddress(getData.secondaryAddress);

    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(useCallback(() => {
    {
      dispatch(setDisplayAddressAll(alltheAddress));
    }
  }, []))



  const pincodeValidation = (e: any) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (pincodeRegex.test(e)) {
      setnotifyname(false);
    } else {
      setnotifyname(true);
    }
  };
  const Lankmark = (e: any) => {
    if (e.length > 10) {
      setnotifyLand(false)
    }
    else (
      setnotifyLand(true)
    )
  }

  const cityValidation = (e: any) => {
    if (e.length >= 3) {
      setcitynotify(false)
    }
    else (
      setcitynotify(true)
    )
  }

  const stateVidation = (e: any) => {
    if (e.length >= 3) {
      setstatenotify(false)
    }
    else (
      setstatenotify(true)
    )
  }

  const mobileavalidation = (e: string) => {
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    if (e.length === 10 && mobileNumberRegex.test(e)) {
      setmobilenotify(false); 
    } else {
      setmobilenotify(true);
    }
  };


  return (
    <ScrollView keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}>
      <View style={{ height: 300, width: '100%' }}>
        <Location handleAddress={handleAddress} />
      </View>

      <View style={Style.container}>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          {placeholderShow && <Text style={Style.side_header}>Enter Your apartment / building / area</Text>}
          <TextInput style={Style.textInput}
            placeholder='Enter Your apartment / building / area'
            value={address.address}
            onChangeText={(text) => { setAddress({ ...address, address: text }) }}
            onFocus={() => setPlaceholderShow(true)}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Flat no. / House no. /Floor / Block</Text>
          <TextInput style={Style.textInput}
            placeholder='Flat no. / House no. /Floor / Block'
            value={address.flat}
            onChangeText={(text) => setAddress({ ...address, flat: text })}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Landmark</Text>
          <TextInput style={Style.textInput}
            value={landmark}
            onChangeText={(text) => { setlandmark(text); Lankmark(text) }}
            placeholder='Landmark'
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        {notifyLand && <Text style={Style.textstyles}>Enter minimum 10 characters</Text>}
        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>City</Text>
          <TextInput style={Style.textInput}
            placeholder='City'
            value={address.city}
            onChangeText={(text) => { setAddress({ ...address, city: text }); cityValidation(text) }}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        {citynotify && <Text style={Style.textstyles}>Enter minimum 3 characters</Text>}
        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>State</Text>
          <TextInput style={Style.textInput}
            placeholder='State'
            value={address.state}
            onChangeText={(text) => { setAddress({ ...address, state: text }); stateVidation(text) }}
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        {statenotify && <Text style={Style.textstyles}>Enter minimum 3 characters</Text>}

        <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Pincode</Text>
          <TextInput style={Style.textInput}
            value={address.pincode}
            onChangeText={(text) => { setAddress({ ...address, pincode: text }), pincodeValidation(text) }}
            placeholder='Pincode'
            keyboardType="numeric"
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        {notifyname && <Text style={Style.textstyles}>Enter correct pincode</Text>}

        {/* <View style={{ marginBottom: 10 }}>
          <Text style={Style.side_header}>Mobile</Text>
          <TextInput style={Style.textInput}
            value={mobile}
            onChangeText={(e) => { setmobile(e); mobileavalidation(e) }}
            placeholder='Mobile'
            keyboardType="phone-pad"
            placeholderTextColor={TEXT_COLORS.secondary}
          />
        </View>
        {mobilenotify && <Text style={Style.textstyles}>Enter correct mobile number</Text>} */}



        <View>
          <Text style={Style.side_header}>Save as</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {saveAs.map((e, inedx) => {
              return <TouchableOpacity style={[Style.savas_btn, { backgroundColor: saveType === e.title  ? `${THEME_COLORS.light_color}` : 'white',
                borderColor: saveType === e.title ? 'white' : 'black' }]}
                key={inedx}
                onPress={() => { setSaveType(e.title); setbutton(e) }}>
                <e.icon fill={saveType === e.title ? 'white' : 'black'} width={20} height={20} color={`${TEXT_COLORS.primary}`} />
                <Text style={{ marginLeft: 5, color: saveType === e.title ? 'white' : 'black' }}>{e.title}</Text>
              </TouchableOpacity>
            })}
          </View>
        </View>
        {/* style={[Style.save_btn,{backgroundColor:checkData? `${THEME_COLORS.secondary}`: `${THEME_COLORS.light_color}`}]} */}

        <TouchableOpacity style={Style.textsave} onPress={() => createAllAddresses(true)} >
          <Text style={{ color: 'white', fontWeight: "bold", fontSize: 20 }} >Save</Text>
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
    color: TEXT_COLORS.primary,
    borderBottomColor: `${TEXT_COLORS.primary}`
  }, side_header: {
    color: TEXT_COLORS.primary,
    fontSize: 15,
    fontWeight: '500'
  },
  textsave: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  textstyles: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold"
  },
  savas_btn: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  save_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.primary,
    height: '100%',
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30
  }
})