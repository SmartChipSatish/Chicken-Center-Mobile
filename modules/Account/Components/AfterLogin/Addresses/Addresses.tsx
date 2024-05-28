import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NoAddressIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { useNavigation } from '@react-navigation/native';
import { TEXT_COLORS, THEME_COLORS } from '../../../../GlobalStyles/GlobalStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { LocationIcon } from '../../../../assets/svgimages/SaveAsIcons';

const Addresses = () => {
  const navigate=useNavigation<any>();
  const locations = useSelector((store: RootState) => store.locations.locations);
  return (
    <SafeAreaView style={styles.container}>
     {locations.length>0? locations.map((e,index)=>{
        return <View
        key={index}
        style={styles.location_list}
        >
        <LocationIcon />
        <View>
        <Text style={styles.location_text}>{e.saveAs}</Text>
        <Text style={styles.location_text}>{e.address}</Text>
        </View>
    </View>
     }): <View style={styles.content}>
        <NoAddressIcon/>
        <Text style={styles.text}>No Address Found!</Text>
      </View>}
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
    color:'black'
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 15,
    backgroundColor: `${THEME_COLORS.secondary}`,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
  },location_list:{
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: `${TEXT_COLORS.primary}`,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
        width: '100%',
        height: 60,
        marginBottom: '2%',
        marginTop:'2%',
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft:'2%'
  },location_text:{
    color:TEXT_COLORS.primary
  }
});

export default Addresses;
