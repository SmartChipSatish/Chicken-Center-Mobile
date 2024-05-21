import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import ProductsList from './ProductsList';
import { BackButtonIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons';
import { THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';

export default function SearchPage({navigation}:any) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={{backgroundColor:`${THEME_COLORS.primary}`,flex:1}}>
        <View style={styles.search_container}>
        <BackButtonIcon onPress={()=>navigation.goBack()}/>
       <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
       </View>
        <ScrollView>
        <View style={styles.products_list}>
            <ProductsList/>
        </View>
        </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    searchBar: {
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 1,
        width:'90%'
      },
      search_container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5
    },
    products_list:{
        justifyContent: 'center', 
        alignItems: 'center'
    }
})