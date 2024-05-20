import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import CarouselCards from '../../Home/components/HomeCauresel/CarouselCard';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ProductsList from '../../Home/components/ProductsList/ProductsList';
import { ChickenSkinless } from '../../assets/svgimages/HomeSvgs/HomeSvgs';
import OfferCards from '../../Home/components/Offers/OfferCards';
import HeaderLocation from '../../location/HeaderLocation'
const { height, width } = Dimensions.get('window')
const HomePage = () => {
  const bannerImage = require('../../../modules/assets/svgimages/HomeSvgs/carouselimages/image1.png')
  const data = [
    {
      title: "Chicken Skinless",
      imgUrl: ChickenSkinless,
      price: 270,
      quantity: '1Kg',
      id: 1
    },
    {
      title: "Chicken Boneless",
      imgUrl: ChickenSkinless,
      price: 400,
      quantity: '1Kg',
      id: 2

    },
    {
      title: "Chicken Wings",
      imgUrl: ChickenSkinless,
      price: 300,
      quantity: '1Kg',
      id: 3

    },
    {
      title: "Chicken Joints",
      imgUrl: ChickenSkinless,
      price: 320,
      quantity: '1Kg',
      id: 4
    }
  ];
  const [searchQuery, setSearchQuery] = React.useState('');


  return (

    <View style={styles.container}>
<View style={styles.HomePageBackground}>
        <HeaderLocation></HeaderLocation>
    </View>
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {/* <View >
          <Image style={styles.banner} source={bannerImage} />
        </View> */}
      </View>

      <View style={styles.carouselContainer}>
        <CarouselCards />
      </View>
      <View style={styles.freshMeats}>
        <Text style={styles.header}>Offers</Text>
      </View>
      <View >
        <OfferCards />
      </View>

      <View style={styles.freshMeats}>
        <Text style={styles.header}>Fresh Meats</Text>
      </View>
      <ScrollView>
        <ProductsList data={data} />
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue'
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
    backgroundColor: '#f5f5f5',
    padding: 10,
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
    height: '30%',
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
  },
  freshMeatsText: {
    fontSize: 18,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  HomePageBackground:{
    backgroundColor:"white",
    height:"7%"
  }
});

export default HomePage;

