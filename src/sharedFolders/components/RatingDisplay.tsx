import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const RatingDisplay = ({ rating, votes }: any) => {
    let backgroundColor;
    if(rating < 2){
        backgroundColor = 'red';
    }else if(rating < 4){
        backgroundColor = 'orange';
    }else{
        backgroundColor = 'green';
    }
  return (
    <View style={styles.container}>
      <View style={[styles.ratingContainer,{backgroundColor}]}>
        <Text style={styles.ratingText}>{rating}</Text>
        {/* <Ionicons name="star" type="font-awesome" color="#fff" size={16} /> */}
        <Ionicons name='star-outline' size={16} color={'#fff'} />
      </View>
      {/* <Text style={styles.votesText}>{votes} Reviews</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 2,
  },
  votesText: {
    marginLeft: 8,
    color: '#000',
  },
});

export default RatingDisplay;
