import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TEXT_COLORS, THEME_COLORS } from '../../../../globalStyle/GlobalStyles';
import { Platform } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5);

const CarouselCardItem = ({ item, index }: any) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={item.imgUrl}
        style={styles.image}
      />
      <LinearGradient
        colors={['transparent', 'rgba(1,1,1,0.8)']}
        style={styles.header}
      >
        <View>
        <Text style={[styles.headerText,{fontSize:18}]}>Chicken</Text>
        <Text style={[styles.headerText,{color:`${THEME_COLORS.secondary}`}]}>UPTO ₹ 100</Text>
        </View>
        <Text style={styles.headerText}>50% OFF</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // width:'100%',
    borderRadius: 10,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: TEXT_COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
        shadowColor: TEXT_COLORS.primary
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
