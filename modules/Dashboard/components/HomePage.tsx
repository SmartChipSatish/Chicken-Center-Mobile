import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import CarouselCards from '../../Home/components/HomeCauresel/CarouselCard';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ProductsList from '../../Home/components/ProductsList/ProductsList';
import { ChickenSkinless } from '../../assets/svgimages/HomeSvgs/HomeSvgs';
import OfferCards from '../../Home/components/Offers/OfferCards';
import HeaderLocation from '../../location/HeaderLocation'
import { TEXT_COLORS, THEME_COLORS } from '../../GlobalStyles/GlobalStyles';
const { height, width } = Dimensions.get('window')
const HomePage = () => {
  const navigate=useNavigation<any>();

  return (

    <View style={styles.container}>
      <View style={styles.HomePageBackground}>
         <HeaderLocation></HeaderLocation>
      </View>
       <TouchableOpacity onPress={()=>navigate.navigate('searchPage')}>
        <Searchbar
          placeholder="Search"
          value={''}
          style={styles.searchBar}
          editable={false}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <CarouselCards />
        </View>
        <View style={styles.freshMeats}>
          <Text style={styles.header}>Fresh Meats</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ProductsList  />
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
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#EBF6FA',
    marginTop: 15,
    borderColor: 'grey',
    borderWidth: 1,
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
    // objectFit:'cover'
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
    marginTop:10
  },
  freshMeatsText: {
    fontSize: 18,
  },
  header: {
    fontSize: 16,
    // fontWeight: 'bold',
    color:`${TEXT_COLORS.primary}`,
    marginBottom:10
  },
  HomePageBackground: {
    backgroundColor: "white",
    height: "7%"
  }
});

export default HomePage;

