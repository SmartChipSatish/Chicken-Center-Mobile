import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TEXT_FONT_SIZE } from '../../../globalStyle/GlobalStyles';

interface RatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
  const handleRating = (newRating: number) => {
    onRatingChange(newRating);
  };

  return (
    <View style={{display:"flex",flexDirection:"row"}}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
          <Text style={{ color: star <= rating ? 'orange' : 'gray',fontSize:TEXT_FONT_SIZE.large }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;

