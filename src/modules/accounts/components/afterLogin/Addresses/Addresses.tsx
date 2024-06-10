import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeleteAddressMutation, useGetAddressByuserMutation } from './store/AddressEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { NoAddressIcon } from '../../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { Cross, LocationIcon, Menuicon } from '../../../../../assets/svgimages/SaveAsIcons';
import { TEXT_COLORS, THEME_COLORS } from '../../../../../globalStyle/GlobalStyles';
import { setDisplayAddressAll, setItemid } from '../../../store/slices/LocationSlice';

const Addresses = () => {
  const [getAddressByUser] = useGetAddressByuserMutation();
  const [deleteOne] = useDeleteAddressMutation();
  const [displayAddress, setDisplayAddress] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setNewVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<any>({});
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const getuserAddress = async () => {
    const value = await AsyncStorage.getItem('userId');
    const userId = value ? JSON.parse(value) : null;
    try {
      const getdata = await getAddressByUser(userId).unwrap();
      setDisplayAddress(getdata?.secondaryAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getuserAddress();
    }, [])
  );

  const formatAddress = (address: any) => {
    return `${address?.houseNo}, ${address?.landmark}, ${address?.city}, ${address?.state} ${address?.pincode || ""}`;
  };

  const handleSubmitAddress = (e: any) => {
    setDeleteId(e);
  };

  const handleDeleteAddress = async () => {
    try {
      await deleteOne({ id: deleteId?._id, status: false }).unwrap();
      const deleteAddress = displayAddress.filter((item: any) => item?._id !== deleteId?._id);
      setDisplayAddress(deleteAddress);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" style={styles.extraLargeIndicator} color={THEME_COLORS.secondary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          {displayAddress.length > 0 ? (
            displayAddress.map((address: any, index: any) => (
              <View style={styles.card} key={index}>
                <View style={styles.iconText}>
                  <LocationIcon fill={"#77022F"} height={20} width={20} />
                  <Text style={styles.cityText}>{address?.city}</Text>
                </View>
                <View style={styles.crossIcondata}>
                  <TouchableOpacity onPress={() => { handleSubmitAddress(address); setNewVisible(true); dispatch(setItemid(address)); }}>
                    <Menuicon height={20} width={20} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.addressText}>{formatAddress(address)}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.content}>
              <NoAddressIcon />
              <Text style={styles.noAddressText}>No Address Found!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setNewVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContents}>
            <TouchableOpacity onPress={() => setNewVisible(!visibleModal)}>
              <View style={styles.crossIcon}>
                <Cross height={10} width={10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('payment')}>
              <Text style={{ color: "black", fontWeight: "bold" }}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.separator2}></View>
            <TouchableOpacity onPress={() => { handleDeleteAddress(); setNewVisible(!visibleModal); }}>
              <Text style={{ color: "black", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      
        <View style={styles.buttonBackground}>
          <TouchableOpacity style={styles.fixedBottomButton} onPress={() => navigation.navigate('addaddress')}>
            <Text style={styles.buttonText}>Add new address</Text>
          </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLORS.primary,
  },
  loadingContainer: {
    marginTop:40, 
  },
  extraLargeIndicator: {
    transform: [{ scale: 1.5 }], 
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBackground: {
    backgroundColor: "white",
    height: 90,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  crossIcondata: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContents: {
    width: 150,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: "center",
    marginRight: 30,
    marginTop: 100,
  },
  crossIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginRight: 10,
  },
  separator2: {
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: '#D3D3D3',
    marginVertical: 10,
  },
});

export default Addresses;
