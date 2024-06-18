import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, BackHandler, TextInput, Platform } from 'react-native';
import CarouselCards from '../../home/components/homeCauresel/CarouselCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProductsList from '../../home/components/productsList/ProductsList';
import HeaderLocation from '../../home/components/location/HeaderLocation'
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useLazyGetAllProductsQuery } from '../../home/store/services/getAllProductsService';
import { setAddProducts, setFavourite } from '../../home/store/slices/ProductsListSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateUserMutation } from '../../auth/store/services/getUserDetailsService';
import Icon from 'react-native-vector-icons/AntDesign';
import { setUser } from '../../accounts/store/slices/UserSlice';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
// import ShowToster from '../../../sharedFolders/components/ShowToster';
import { RootState } from '../../../store/store';

const { height, width } = Dimensions.get('window')
const HomePage = () => {
  const navigate = useNavigation<any>();
  const dispatch = useDispatch()
  const products = useSelector((store: RootState) => store.products.addProducts);

  const [updateUser] = useUpdateUserMutation();
  const [getItems] = useLazyGetAllProductsQuery();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
  const getProducts = async (page: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await getItems({ page: page });
      console.log(res.data.items, 'res')
      if (res?.data?.items.length > 0) {
        dispatch(setAddProducts(products.concat(res?.data?.items)));

      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };
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
        dispatch(setUser(response.data));
        const favList = response.data.favouriteItems;
        if (favList?.length > 0) {
          favList.map((item: any) => {
            return dispatch(setFavourite(item))
          })
        }

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
  useEffect(() => {
    getProducts(page);
  }, [page]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  const handleEnabledPressed = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          Alert.alert('Error Enabling Location Services', error.message);

        }
      }
    } else {
      Alert.alert('This functionality is only available on Android.');
    }
  };

  useEffect(() => {
    handleEnabledPressed();
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
          <Icon name="search1" size={20} color={TEXT_COLORS.secondary} style={styles.searchIcon} />
          <TextInput style={styles.searchBar}
            placeholder='Search'
            editable={false}
            placeholderTextColor={TEXT_COLORS.secondary}
          ></TextInput>
        </TouchableOpacity>
      </View>
      {/* <Text>Enable Location Services</Text> */}
      {/* <Button title="Enable Location" onPress={handleEnabledPressed} /> */}
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.carouselContainer}>
          <CarouselCards />
        </View>
        <View style={styles.freshMeats}>
          <Text style={styles.header}>Fresh Meats</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
            <ProductsList isLoading={isLoading} />
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
  },
  search_MainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: `${TEXT_COLORS.primary}`,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '2%',
    height: 60,
    paddingLeft: '5%'
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
    marginRight: '2%'
  }, searchIcon: {
    marginRight: 10,
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
    marginTop: '2%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
    width: '100%'
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
    marginTop: 10,
  },
  freshMeatsText: {
    fontSize: 18,
  },
  header: {
    fontSize: 18,
    color: THEME_COLORS.secondary,
    marginBottom: 10,
    marginLeft: '2%',
    fontWeight: '700'
  },
  HomePageBackground: {
    backgroundColor: "white",
    // height: "12%",
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  }
});

export default HomePage;

