import React, { useState, useEffect,useCallback } from "react"
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
AddressesIcon
import CrossMark from '../../../../assets/svgimages/util';
import { AddressesIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { TEXT_COLORS, THEME_COLORS } from "../../../../globalStyle/GlobalStyles";
import { Image } from "react-native";
import { LocationIconHome } from "../../../../assets/svgimages/SvgIcons";
import { LocationIcon } from "../../../../assets/svgimages/SaveAsIcons";
import AppTitle from "./AppTitle";
const appLogo = require('../../../../assets/Images/app-logo.png');
import { useDispatch, useSelector } from "react-redux";
import { setLatitudes, setLongitudes } from "../../../accounts/store/slices/LocationSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileAvatar from "../../utils/ProfileAvatar";
import { RootState } from "../../../../store/store";
import { useCreateAddressMutation, useGetAddressByuserMutation } from "../../../accounts/components/afterLogin/Addresses/store/AddressEndpoints";
import { useFocusEffect } from '@react-navigation/native';
const HeaderLocation = () => {
  const user = useSelector((store: RootState) => store.user.user);
  const [getAddressByUser] = useGetAddressByuserMutation()
  const [alltheAddress, setAllTheAddress] = useState<any>([]);
  const [location, setLocation] = useState({ city: '', country: '', address: '', pincode: "", street: "", state: "", landmark: "", mobile: "" });
  const [addAddress] = useCreateAddressMutation();
  const [userInput, setUserInput] = useState<any>('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [previousLocation, setPreviousLocation] = useState('');
  const [useloc, setUserLoc] = useState<any>({});
  const [userName, setUserName] = useState('');
  const [imageUri, setImgageUri] = useState('')
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibles, setvisible] = useState<any>(false)

  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [displayAddress, setDisplayAddress] = useState('');
  const [error, setError] = useState<any>(null);
  const mapKey = 'AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY'
  const fetchSuggestions = async (text: any) => {
    const apiKey = mapKey; // Replace with your API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`,
    );
    const data = await response.json();
    setSuggestions(data.predictions);
  };

  const handleSelectLocation = async (item: any) => {
    setUserInput(item.description);
    setSuggestions([]);

    const granted = await requestLocationPermissionIfNeeded();
    if (granted) {
      const apiKey = mapKey;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${item.place_id}&key=${apiKey}`,
      );
      const data = await response.json();
      const location = data.results[0].geometry.location;
      setUserLoc({ latitude: location.lat, longitude: location.lng });
      setLatitude(location.lat);
      setLongitude(location.lng);
      setDisplayAddress(item.description);
      setModalVisible(false); // Close the modal
    }
  };


  const requestLocationPermissionIfNeeded = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true; // For iOS, assume permission is always granted
    }
  };

  const handleUseCurrentLocation = async () => {
    const granted = await requestLocationPermissionIfNeeded();
    if (granted) {
      Geolocation.getCurrentPosition(
        async location => {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          try {
            const response = await Geocoder.from(
              location.coords.latitude,
              location.coords.longitude,
            );
            const address = response.results[0].formatted_address;
            setDisplayAddress(address);
            setUserInput(address);
            setUserLoc({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
          } catch (error: any) {
            setError(error.message);
          }
        },
        error => setError(error.message),
        { timeout: 10000, maximumAge: 60000 }
      );
      setModalVisible(false); // Close the modal
    }
  };

  const requestLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async location => {
              setLatitude(location.coords.latitude);
              setLongitude(location.coords.longitude);

              try {
                const response = await Geocoder.from(
                  location.coords.latitude,
                  location.coords.longitude,
                );
                const address = response.results[0].formatted_address;
                const addressComponents = response.results[0].address_components;
                const flatComponent = addressComponents.find(component =>
                  component.types.includes('subpremise')
                );
                const cityComponent = addressComponents.find(component =>
                  component.types.includes('locality')
                );
                const countryComponent = addressComponents.find(component =>
                  component.types.includes('country')
                );
                const pincodecomponent = addressComponents.find(component =>
                  component.types.includes('postal_code')
                );
                const streetComponent = addressComponents.find(component =>
                  component.types.includes('route')
                );
                const stateComponent = addressComponents.find(component =>
                  component.types.includes('administrative_area_level_1')
                );

                const flat = flatComponent ? flatComponent.long_name : '';
                const city = cityComponent ? cityComponent.long_name : '';
                const country = countryComponent ? countryComponent.long_name : '';
                const pincode = pincodecomponent ? pincodecomponent.long_name : '';
                const street = streetComponent ? streetComponent.long_name : '';
                const state = stateComponent ? stateComponent.long_name : '';
                const landmark = flatComponent ? flatComponent.long_name : '';
                const mobile = flatComponent ? flatComponent.long_name : '';
                setLocation({ city, country, address, pincode, street, state, landmark, mobile })
                setDisplayAddress(address);
                setUserLoc({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                });
              } catch (error: any) {
                setError(error.message);
              }
            },
            error => setError(error.message),
            { timeout: 10000, maximumAge: 60000 }
          );
        } else {
          setError('Location permission denied');
          setModalVisible(true);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };


  useEffect(() => {
    Geocoder.init(mapKey);
  }, []);

  useEffect(() => {
    dispatch(setLatitudes(latitude))
    dispatch(setLongitudes(longitude))
  })
  useEffect(() => {
    if (userInput) {
      fetchSuggestions(userInput);
    } else {
      setSuggestions([]);
    }
  }, [userInput]);

  useEffect(() => {
    requestLocation();
  }, []);
  useEffect(() => {
    if (user) {
      setUserName(user.name ?? '');
      setImgageUri(user.profileUrl)
    }
  }, [user]);
  console.log(userName, imageUri)

  // const getAllAddresses = async () => {
  //   const value = await AsyncStorage.getItem('userId');
  //   const userId = value ? JSON.parse(value) : null;
  //   try {
  //     const getdata = await getAddressByUser(userId).unwrap();
  //     setAllTheAddress(getdata.secondaryAddress);

  //     if (getdata.secondaryAddress.length > 0) {
  //       setAllTheAddress(getdata.secondaryAddress);
  //     } else {
  //       createAllAddressesSecond(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const getAllAddresses = async () => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    try {
      const getdata = await getAddressByUser(userId).unwrap();
      setAllTheAddress(getdata.secondaryAddress);
  
      if (getdata.secondaryAddress.length === 0) {
        createAllAddressesSecond(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createAllAddressesSecond = async (status: boolean) => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    let dataTosend = {
      name: location?.address,
      houseNo: location?.address,
      city: location?.city,
      pincode: Number(location?.pincode),
      landmark: location.landmark,
      state: location?.state,
      location: { coordinates: [useloc.latitude, useloc.longitude] },
      mobile: Number(location.mobile),
      status: status,
    };
    try {
      if (location?.address && location?.city && location?.pincode && location?.state) {
        await addAddress({ id: userId, user: dataTosend }).unwrap();
        getAllAddresses(); // Refresh addresses after adding
        
      }
    } catch (error) {
      console.log(error);
    }
  };

 useFocusEffect(useCallback(()=>{{
  getAllAddresses();
  }},[]))

  // useFocusEffect(useCallback(()=>{{
  //   dispatch(setDisplayAddressAll(alltheAddress));
  // }},[alltheAddress, dispatch]))


  
  
  



  return (
    <View>
      <View style={styles.locationImg}>
        <View style={styles.displayLocation}>
          {/* <Image source={LocationIcon}
            style={styles.logo} /> */}
          <LocationIconHome color={`${THEME_COLORS.secondary}`} />
          <TouchableOpacity onPress={() => {
            setPreviousLocation(userInput || displayAddress);
            setvisible(!visibles)
          }} >
            <Text style={styles.locationText}>Location</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.locationText, { width: 200 }]}>
              {displayAddress !== '' ? displayAddress : 'Fetching location...'}
            </Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 80 }}>
            <ProfileAvatar name={userName} imgUrl={imageUri} width={40} height={40} profileView={true} onPress={() => navigation.navigate('account')} />
          </View>
        </View>


      </View>

      <View style={styles.centeredView1}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibles}
          onRequestClose={() => {
            setvisible(!visibles);
          }}>
          <View style={styles.secondModel}>
            <Text style={styles.chaneText}>Change delivery Location?</Text>
            <Text style={{ marginTop: 10, color: "grey", fontWeight: "bold" }}>
              Item prices,availability & promotions are location specific.Your cart may get modified on choosing a different location.
            </Text>
            <View style={styles.Buttons} >
              <TouchableOpacity onPress={() => { setvisible(false) }}>
                <View >
                  <Text style={styles.singleButton}>Stay here</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => { setModalVisible(true); setvisible(false) }}>
                <View >
                  <Text style={styles.singleButton1}>Change</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: 20,
                }}>
                Select a Delivery Location
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setUserInput(previousLocation);
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.crossMark}>
                  <CrossMark color={'black'} width={25} height={25}></CrossMark>
                </View>
              </TouchableOpacity>
              <Searchbar
                style={styles.searchBar}
                placeholder="Enter your apartment / area"
                onChangeText={setUserInput}
                value={userInput}
              />

              <View style={styles.locationImg2}>
                <AddressesIcon width={30} height={30} color={'maroon'} />
                <Text
                  style={styles.modalText}
                  // onPress={() => {
                  //   setUserInput(displayAddress);
                  //   setUserLoc({latitude, longitude});
                  //   setModalVisible(!modalVisible);
                  // }}
                  onPress={handleUseCurrentLocation}
                >
                  Use current location
                </Text>
              </View>
              <View style={styles.locationList}>
                {suggestions.length > 0 &&
                  suggestions.map((item: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleSelectLocation(item);
                        setModalVisible(!modalVisible);
                      }}
                      style={{
                        borderBottomWidth: 1,
                        width: '100%',
                        borderColor: 'grey',
                        padding: 5,
                      }}>
                      <View style={styles.locationImg1}>
                        <AddressesIcon width={15} height={15} color={'black'} />
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HeaderLocation;
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  singleButton: {
    color: THEME_COLORS.secondary,
    borderWidth: 1,
    padding: 10,
    borderColor: THEME_COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 10,
    width: 160,
    textAlign: "center",
    marginTop: 10

  },
  singleButton1: {
    color: "white",
    padding: 10,
    backgroundColor: THEME_COLORS.secondary,
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 10,
    width: 160,
    textAlign: "center",
    marginLeft: 30,
    marginTop: 10,

  },
  chaneText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,

  },
  secondModel: {
    backgroundColor: "white",
    height: 300,
    marginTop: 560,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0"

  },

  crossMark: {
    marginLeft: 330,
    marginTop: -30,
  },
  locationText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,
    width: '90%',
  },
  locationImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    marginLeft: '3%',
    marginRight: '3%'
  },
  locationImg1: {
    display: 'flex',
    flexDirection: 'row',
  },

  searchBar: {
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    marginTop: 30,
    borderColor: 'grey',
    borderWidth: 1,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'maroon',
    marginTop: -0,

    fontWeight: 'bold',
    fontSize: 20,
  },
  itemContainer: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 150,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  locationImg2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -140,
    marginTop: 40,
    columnGap: 5,
    padding: 5,
  },
  locationList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 10,
    width: '100%',
    padding: 15,
  }, displayLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    backgroundColor: THEME_COLORS.secondary,
    width: 40,
    height: 40,
    borderRadius: 25,
  }
});