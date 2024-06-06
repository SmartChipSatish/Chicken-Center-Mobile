import { View, ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles'
import ProductsCard from '../../home/components/productsList/ProductCard'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setFavourite } from '../../home/store/slices/ProductsListSlice'
import { useUpdateUserMutation } from '../../auth/store/services/getUserDetailsService'
import { setUser } from '../../accounts/store/slices/UserSlice'
const Favourite = () => {
    const dispatch = useDispatch();
    const [updateUser] = useUpdateUserMutation();

    const products = useSelector((store: RootState) => store.products.addProducts)
    const favouritesList = products.filter(item => item.favourite === true);

    const handleFavourite = async (item: any) => {
        try {
            const storeduserId = await AsyncStorage.getItem('userId');
            if (storeduserId) {
                const userId = storeduserId.replace(/['"]/g, '').trim();
                const isItemInFavourites = favouritesList.some(favItem => favItem.id === item.id);

                let updatedFavouritesList;
                if (isItemInFavourites) {
                    updatedFavouritesList = favouritesList.map(favItem =>
                        favItem.id === item.id ? item : favItem
                    );
                } else {
                    updatedFavouritesList = [...favouritesList, item];
                }


                const response = await updateUser({
                    userId: userId,
                    favouriteItems: updatedFavouritesList
                }).unwrap();
                dispatch(setUser(response.data));
                dispatch(setFavourite(item));

            }
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <ScrollView style={{ backgroundColor: THEME_COLORS.primary }}>
            <View style={styles.container}>
                {favouritesList?.length > 0 ? (
                    favouritesList?.map((item: any) => (
                        <ProductsCard type='product' item={item} key={item.id} handleFav={handleFavourite}
                        />
                    ))
                ) : (
                    <View style={styles.noFavouritesContainer}>
                        <Text style={styles.noFavouritesText}>No Favourites</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noFavouritesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
    },
    noFavouritesText: {
        color: TEXT_COLORS.primary,
    },
});



export default Favourite