// ProfileHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ProfileAvatar from '../../home/utils/ProfileAvatar';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';

const ProfileCard = () => {
  return (
    <View style={styles.header}>
      {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} /> */}
      <ProfileAvatar name={'sai'} imgUrl={'https://va.placeholder.com/100'} width={80} height={80} profileView={true} />

      <Text style={styles.nameText}>Saiprakash</Text>
      <Text style={styles.emailText}>talakantisaiprakash@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME_COLORS.secondary,
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    color: `${TEXT_COLORS.whiteColor}`,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: `${TEXT_COLORS.whiteColor}`,
    fontWeight: 'bold',

  },
});

export default ProfileCard;
