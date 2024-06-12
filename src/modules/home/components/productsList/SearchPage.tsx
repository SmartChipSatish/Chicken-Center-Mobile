import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsList';
import { BackButtonIcon } from '../../../../assets/svgimages/HomeSvgs/svgsIcons';
import { TEXT_COLORS, THEME_COLORS } from '../../../../globalStyle/GlobalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSearchProductsListMutation } from '../../store/services/getAllProductsService';
import ProductsCard from './ProductCard';
import { ActivityIndicator } from 'react-native';

export default function SearchPage({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchList, setSearchList] = useState([]);
  const [getSearchList] = useSearchProductsListMutation();
  const [loading, setLoding] = useState<boolean>(false)

  const handleSearchList = async () => {
    setLoding(true);
    if (searchQuery.length >= 3) {
      try {
        const searchData = await getSearchList(searchQuery);
        setSearchList(searchData.data)
        setLoding(false);
      } catch (error) {
        setSearchList([])
        setLoding(false);
      }
    } else {
      setSearchList([])
      setLoding(false);
    }
  }

  useEffect(() => {
    handleSearchList();
  }, [searchQuery]);

  return (
    <View style={{ backgroundColor: `${THEME_COLORS.primary}`, flex: 1 }}>
      <View style={styles.search_container}>
        <BackButtonIcon onPress={() => navigation.goBack()} />
        <View
          style={styles.searchBarContainer}
        >
          <Icon name="search1" size={20} color={TEXT_COLORS.secondary} style={styles.searchIcon} />
          <TextInput style={styles.searchBar}
            placeholder='Search'
            onChangeText={setSearchQuery}
            editable={true}
            placeholderTextColor={TEXT_COLORS.primary}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.products_list}>
          {searchQuery === '' && <ProductsList />}
          {searchQuery !== '' && searchList.length > 0 ? <View>
            {
              searchList.map((e) => {
                return <ProductsCard type='product'
                  item={e} />
              })
            }
          </View> :
            <View style={styles.loding}>
              {searchQuery !== '' && loading && <ActivityIndicator size="large" color={'red'} />}
              {searchQuery !== '' && !loading && <Text style={styles.no_searchText}>No Search Items</Text>}
            </View>}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  search_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '1%',
    marginTop: '3%'
  },
  products_list: {
    justifyContent: 'center',
    alignItems: 'center'
  }, searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: TEXT_COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '2%',
    height: 60,
    paddingLeft: '5%',
    marginRight: '2%'
  }, searchBar: {
    marginRight: '2%',
    color:TEXT_COLORS.primary,
    fontSize:16
  }, searchIcon: {
    marginRight: 10,
  }, no_searchText: {
    fontSize: 18,
    color: TEXT_COLORS.primary,
    fontWeight: 'bold'
  }, loding: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  }
})