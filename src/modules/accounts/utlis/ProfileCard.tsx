// ProfileHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ProfileAvatar from '../../home/utils/ProfileAvatar';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
const ProfileCard = () => {
  const user = useSelector((store: RootState) => store.user.user);

  return (
    <View style={styles.header}>
      {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} /> */}
      <ProfileAvatar name={user?.name ?? ''} imgUrl={user?.profileUrl} width={80} height={80} profileView={true} />

      <Text style={styles.nameText}>{user?.name}</Text>
      <Text style={styles.emailText}>{user?.email}</Text>
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
