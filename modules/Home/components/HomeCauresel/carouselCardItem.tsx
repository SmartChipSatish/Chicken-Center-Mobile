import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5)

const CarouselCardItem = ({ item, index }: any) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={item.imgUrl}
        style={styles.image}
      />
      {/* <Text style={styles.header}>{item.title}</Text> */}
      {/* <Text style={styles.body}>{item.body}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    height: '100%',
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem