import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetAddressByuserMutation } from './store/AddressEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { NoAddressIcon } from '../../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { LocationIcon } from '../../../../../assets/svgimages/SaveAsIcons';
import { TEXT_COLORS, THEME_COLORS } from '../../../../../globalStyle/GlobalStyles';
import { setDisplayAddressAll } from '../../../store/slices/LocationSlice';

const Addresses = () => {
  const [getAddressByUser] = useGetAddressByuserMutation();
  const [displayAddress, setDisplayAddress] = useState<any>([]);
  const dispatch = useDispatch()

  const getuserAddress = async () => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    try {
      const getdata = await getAddressByUser(userId).unwrap();
      setDisplayAddress(getdata.secondaryAddress);
      // setDisplayAddress(prevAddresses => [getdata, ...prevAddresses]);
    } catch (error) {
      console.log(error);
    }
  };

  const formatAddress = (address: any) => {
    return `${address?.houseNo}, ${address?.landmark}, ${address?.city}, ${address?.state} ${address?.pincode || ""}`;
  };

  useFocusEffect(useCallback(()=>{{
    getuserAddress();
  }},[]))

  const navigate = useNavigation<any>();

  const handleSubmitAddress = (e: any) => {
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View >
          {displayAddress.length > 0 ? (
            displayAddress.map((address: any, index: any) => (
              <TouchableOpacity key={index} onPress={() => { handleSubmitAddress(address) }}>
                <View style={styles.card}>
                  <View style={styles.iconText}>
                  <LocationIcon height={20} width={20} />
                      <Text style={styles.cityText}>{address?.city}</Text>
                  </View>
                  <View>
                    <Text style={styles.addressText}>{formatAddress(address)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.content}>
              <NoAddressIcon />
              <Text style={styles.noAddressText}>No Address Found!</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fixedBottomButton} onPress={() => navigate.navigate('addaddress')}>
        <Text style={styles.buttonText}>Add new address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconText: {
   display:"flex",
   flexDirection:"row"
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLORS.primary,
  },
  addressText: {
    fontSize: 14,
    color: TEXT_COLORS.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: THEME_COLORS.secondary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Addresses;