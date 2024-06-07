import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Location = ({handleAddress}:{handleAddress:(data:any)=>void}) => {
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [location,setLocation]=useState({city:'',country:'',address:'',pincode:"",street:"",state:""});

  const [error, setError] = useState<any>(null);

  const handleMapPress = async (e: any) => {
  const { latitude, longitude } = e.nativeEvent.coordinate;
  setLatitude(latitude);
  setLongitude(longitude);
  try {
    const response = await Geocoder.from(latitude, longitude);
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
    const pincodeComponent = addressComponents.find(component =>
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
    const pincode = pincodeComponent ? pincodeComponent.long_name : '';
    const street = streetComponent ? streetComponent.long_name : '';
    const state = stateComponent ? stateComponent.long_name : '';
    setLocation({ city, country, address, pincode,street,state });
    setAddress(address);
  } catch (error: any) {
    setError(error.message);
  }
};


  useEffect(() => {
    Geocoder.init('AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY');
  }, []);

  // useEffect(()=>{
  //   handleAddress(location)
  // },[address,location])
  useFocusEffect(
    useCallback(() => {
        handleAddress(location);
    }, [address, location])
);

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
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Initialize the Geocoder with your API key
          Geocoder.init('AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY');
          // Fetch the current location
          Geolocation.getCurrentPosition(
            async (location:any) => {
              setLatitude(location.coords.latitude);
              setLongitude(location.coords.longitude);
              // Reverse geocoding
              try {
                const response = await Geocoder.from(
                  location.coords.latitude,
                  location.coords.longitude
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
                const pincode=pincodecomponent?pincodecomponent.long_name : '';
                const street=streetComponent?streetComponent.long_name : '';
                const state=stateComponent?stateComponent.long_name : '';
                setLocation({ city, country, address, pincode,street,state })
                setAddress(address);
              } catch (error:any) {
                setError(error.message);
              }
            },
            (error:any) => setError(error.message),
            { timeout: 10000, maximumAge: 60000,   }
          );
        } else {
          setError('Location permission denied');
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
    <View style={{ flex: 1 }}>
      {latitude && longitude && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude || 0,
            longitude: longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {latitude && longitude && (
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        {/* <Text>Your Current Location:</Text> */}
        {latitude && longitude ? (
          <Text>
            Latitude: {latitude}, Longitude: {longitude}
          </Text>
        ) : (
          <Text>{error ? `Error: ${error}` : 'Fetching location...'}</Text>
        )}
        {/* <Text style={{color:"yellow",fontWeight:"bold",fontSize:30,backgroundColor:"black",padding:10}}>{address ? ` ${address}` : 'Fetching address...'}</Text> */}
       
      </View>
    </View>
  );
};
export default Location;