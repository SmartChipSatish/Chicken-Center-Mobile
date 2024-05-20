import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NoAddressIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { useNavigation } from '@react-navigation/native';

const Addresses = () => {
  const navigate=useNavigation<any>()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NoAddressIcon/>
        <Text style={styles.text}>No Address Found!</Text>
      </View>
      <TouchableOpacity style={styles.fixedBottomButton} onPress={()=>navigate.navigate('addaddress')}>
        <Text style={styles.buttonText}>Add new address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // Space for the button
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    
  },
});

export default Addresses;
