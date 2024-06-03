import { View, ScrollView, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles'
import ProductsCard from '../../home/components/productsList/ProductCard'
export default function Favourite() {
    const dispatch = useDispatch();

    const products = useSelector((store: RootState) => store.products.addProducts)
    const favouritesList = products.filter(item => item.favourite === true);
   
    return (
        <ScrollView style={{backgroundColor: THEME_COLORS.primary }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                {favouritesList?.length>0? favouritesList?.map((item: any) => {
                    return (
                        <ProductsCard type='product'
                            item={item}
                             />
                    )
                }):<View>
                    <Text style={{color:TEXT_COLORS.primary,fontWeight:'bold'}}>No Favourites</Text>
                </View>}
            </View>
        </ScrollView>
    )
}