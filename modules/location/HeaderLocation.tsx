import React,{useState,useEffect} from "react"
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
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
AddressesIcon
import CrossMark from '../assets/svgimages/util';
import { AddressesIcon } from '../assets/svgimages/AccountsSvgs/accountsSvgs';


const HeaderLocation = () => {
  const [userInput, setUserInput] = useState<any>('');
  const [suggestions, setSuggestions] = useState<any>([]);
  const [previousLocation, setPreviousLocation] = useState('');
  const [useloc, setUserLoc] = useState({});
  console.log(useloc, 'sssss');

  const fetchSuggestions = async (text:any) => {
    const apiKey = 'AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY'; // Replace with your API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`,
    );
    const data = await response.json();
    setSuggestions(data.predictions);
  };

  useEffect(() => {
    if (userInput) {
      fetchSuggestions(userInput);
    } else {
      setSuggestions([]);
    }
  }, [userInput]);

  const handleSelectLocation = async (item:any) => {
    setUserInput(item.description);
    setSuggestions([]);

    const apiKey = 'AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY'; // Replace with your API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${item.place_id}&key=${apiKey}`,
    );
    const data = await response.json();
    const location = data.results[0].geometry.location;
    setUserLoc({latitude: location.lat, longitude: location.lng});
  };

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibles,setvisible]=useState<any>("false")

  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [add, setAddress] = useState('');
  console.log(add, 'syamsundarsai');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    Geocoder.init('AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY');
  }, []);

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
          // Initialize the Geocoder with your API key
          Geocoder.init('AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY');

          // Fetch the current location
          Geolocation.getCurrentPosition(
            async location => {
              setLatitude(location.coords.latitude);
              setLongitude(location.coords.longitude);

              // Reverse geocoding
              try {
                const response = await Geocoder.from(
                  location.coords.latitude,
                  location.coords.longitude,
                );
                console.log(response.results[0].formatted_address, 'response');
                const address = response.results[0].formatted_address;
                setAddress(address);
              } catch (error:any) {
                setError(error.message);
              }
            },
            error => setError(error.message),
            {timeout: 10000, maximumAge: 60000,},
          );
        } else {
          setError('Location permission denied');
          setModalVisible(true);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <View>
      {/* {useloc.latitude && useloc.longitude && (
        <MapView
          style={{width: '100%', height: 400}}
          initialRegion={{
            latitude: useloc.latitude,
            longitude: useloc.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {useloc.latitude && useloc.longitude && (
            <Marker
              coordinate={{
                latitude: useloc.latitude,
                longitude: useloc.longitude,
              }}
              title="Selected Location"
            />
          )}
        </MapView>
      )} */}

      <TouchableOpacity
        onPress={() => {
          setPreviousLocation(userInput || add);
          // setModalVisible(true);
          setvisible(true)
        }}>
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: 'white',
          }}>
          <View>
            {latitude && longitude ? (
              <>
                {/* <Text>
                  Latitude: {latitude}, Longitude: {longitude}
                </Text> */}
                {userInput ? (
                  <View style={styles.locationImg}>
                    <AddressesIcon width={20} height={20} color={'red'} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.locationText}>
                      {userInput}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.locationImg}>
                    <AddressesIcon width={20} height={20} color={'red'} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.locationText}>
                      {add}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text>{error ? `Error: ${error}` : 'Fetching location...'}</Text>
            )}
            {/* {useloc.latitude && useloc.longitude && (
              <Text>
                Latitude: {useloc.latitude}, Longitude: {useloc.longitude}
              </Text>
            )} */}
          </View>
        </View>
      </TouchableOpacity>

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
      <Text style={{marginTop:10,color:"grey",fontWeight:"bold"}}>
        Item prices,availability & promotions are location specific.Your cart may get modified on choosing a different location.
        </Text>
        <View style={styles.Buttons} >
          <TouchableOpacity onPress={()=>{setvisible(false)}}>
          <View >
          <Text style={styles.singleButton}>Stay here</Text>
          </View>
          </TouchableOpacity>
         
         
         <TouchableOpacity onPress={()=>{setModalVisible(true);setvisible(false)}}>
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
                  onPress={() => {
                    setUserInput(add);
                    setUserLoc({latitude, longitude});
                    setModalVisible(!modalVisible);
                  }}>
                  Use current location
                </Text>
              </View>
              <View style={styles.locationList}>
                {suggestions.length > 0 &&
                  suggestions.map((item:any, index:number) => (
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
  Buttons:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  },
  singleButton:{
      color:"rgba(222,43,85,255)",
      borderWidth:1,
      padding:10,
      borderColor:"black",
      fontWeight:"bold",
      fontSize:20,
      borderRadius:10,
      width:160,
      textAlign:"center",
      marginTop:10
      
  },
  singleButton1:{
    color:"white",
    padding:10,
   backgroundColor:"rgba(222,43,85,255)",
    fontWeight:"bold",
    fontSize:20,
    borderRadius:10,
    width:160,
    textAlign:"center",
    marginLeft:30,
    marginTop:10,
    
},
  chaneText:{
      color:"black",
      fontWeight:"bold",
      fontSize:20,
    
  },
  secondModel:{
   backgroundColor:"white",
   height:300,
   marginTop:550,
   borderRadius:20,
   padding:20,
   borderWidth:1,
   borderColor:"#f0f0f0"

  },

  crossMark: {
    marginLeft: 350,
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
  },
  locationImg1: {
    display: 'flex',
    flexDirection: 'row',
  },

  searchBar: {
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
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
    shadowOffset: {width: 0, height: 2},
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
    marginLeft: -160,
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
  },
});
