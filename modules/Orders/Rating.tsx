

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Alert, Text } from 'react-native';

const Rating = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomerRatingBar = () => {
    return (
      <View style={styles.customerRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => { setDefaultRating(item) }}
              >
                <Image style={styles.starImgStyle}
                  source={
                    item <= defaultRating
                      ? { uri: starImgFilled }
                      : { uri: starImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  return (
    <View>
      {CustomerRatingBar()}
      <Text style={styles.textStyle}>
        {/* {defaultRating + ' / ' + maxRating.length} */}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        // style={styles.buttonStyle}
        onPress={() => Alert.alert(`Selected Rating: ${defaultRating}`)}
      >
        {/* <Text>Get selected value</Text> */}
      </TouchableOpacity>
    </View>
  )
}



{/* <div>
      {data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ) : (
        <h1>No data found</h1>
      )}
    </div> */}

export default Rating;

const styles = StyleSheet.create({
  customerRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    padding: 15,
    backgroundColor: "green"
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    marginTop: 20
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover"
  }
});
