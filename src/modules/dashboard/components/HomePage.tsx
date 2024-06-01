import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert, BackHandler, Platform, TextInput } from 'react-native';
import CarouselCards from '../../home/components/homeCauresel/CarouselCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ProductsList from '../../home/components/productsList/ProductsList';
import HeaderLocation from '../../home/components/location/HeaderLocation'
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useGetAllProductsQuery, useGetItemsDetailsMutation, useLazyGetAllProductsQuery } from '../../home/store/services/getAllProductsService';
import { setAddProducts } from '../../home/store/slices/ProductsListSlice';
import { useDispatch } from 'react-redux';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateUserMutation } from '../../auth/store/services/getUserDetailsService';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get('window')
let db = openDatabase({ name: 'itemslist.db' });

const HomePage = () => {
  const navigate = useNavigation<any>();
  const [itemsData] = useGetItemsDetailsMutation();
  const [updateUser] = useUpdateUserMutation();

  const [getItems] = useLazyGetAllProductsQuery<any>();
  const dispatch = useDispatch()
  const BackPressAlert = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp()
      }

    ])
    return true;
  }

  const sendFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcmToken');

    try {
      const storeduserId = await AsyncStorage.getItem('userId');


      if (storeduserId) {
        const userId = storeduserId.replace(/['"]/g, '').trim();
        const response = await updateUser({
          userId: userId,
          deviceToken: token
        }).unwrap();

      }
    } catch (error) {
      console.log(error)

    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', BackPressAlert);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', BackPressAlert)
      }
    }, [])
  );

  const handleGetItemData = async () => {
    getItems().then((data) => {
      dispatch(setAddProducts(data.data));
    }).catch((error) => {
      console.log(error, 'error');
    })
  }

  useEffect(() => {
    handleGetItemData();
  }, [])
  useEffect(() => {
    sendFcmToken()
  }, [])
  return (

    <View style={styles.container}>
      <View style={styles.HomePageBackground}>
        <HeaderLocation></HeaderLocation>
      </View>
      <View style={styles.search_MainContainer}>
      <TouchableOpacity onPress={() => navigate.navigate('searchPage')}
        style={styles.searchBarContainer}>
        <Icon name="search1" size={20} color={TEXT_COLORS.secondary}  style={styles.searchIcon}/>
        <TextInput style={styles.searchBar}
                   placeholder='Search'
                   editable={false}
                   placeholderTextColor={TEXT_COLORS.secondary}
                   ></TextInput>
      </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <CarouselCards />
        </View>
        <View style={styles.freshMeats}>
          <Text style={styles.header}>Fresh Meats</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ProductsList />
          </View>
        </View>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${THEME_COLORS.primary}`
  }, search_MainContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: `${TEXT_COLORS.primary}`,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '2%',
    height:60,
    paddingLeft:'5%'
  },
  banner: {
    backgroundColor: '#007bff',
    height: 100,
    width: '100%',
    objectFit: 'fill'
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
  },
  bannerAddress: {
    color: '#fff',
    fontSize: 16,
  },
  searchBar: {
    marginRight:'2%'
  },searchIcon:{
    marginRight:10,
  },
  searchBarText: {
    fontSize: 16,
  },
  bestDeal: {
    backgroundColor: '#fff',
    padding: 10,
  },
  bestDealText: {
    fontSize: 18,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  carouselItem: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselText: {
    fontSize: 16,
  },
  carouselImage: {
    height: height / 4,
    width: width
  },
  nearestShops: {
    backgroundColor: '#fff',
    padding: 10,
  },
  nearestShopsText: {
    fontSize: 18,
  },
  freshMeats: {
    backgroundColor: '#fff',
    padding: 3,
    marginTop: 10
  },
  freshMeatsText: {
    fontSize: 18,
  },
  header: {
    fontSize: 17,
    color: `${TEXT_COLORS.primary}`,
    marginBottom: 10,
    marginLeft: '2%'
  },
  HomePageBackground: {
    backgroundColor: "white",
    height: "7%"
  }
});

export default HomePage;

