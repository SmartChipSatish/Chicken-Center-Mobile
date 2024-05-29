import { View, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { THEME_COLORS } from '../../../globalStyle/GlobalStyles'
import ProductItem from '../../home/components/productsList/AddItemModal'
import { setFavourite } from '../../home/store/slices/ProductsListSlice'
import ProductsCard from '../../home/components/productsList/ProductCard'
export default function Favourite() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState<string>('');

    const handleClose = () => {
        setShow(false)
    }
    const products = useSelector((store: RootState) => store.products.addProducts)
    const favouritesList = products.filter(item => item.favourite === true);
    const modalShow = (e: { stopPropagation: () => void }, itemId: string) => {
        e.stopPropagation();
        setShow(true)
        setProductId(itemId);
    }

    const handleFavourite = (item: any) => {
        dispatch(setFavourite(item))
    }
    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: THEME_COLORS.primary }}>
                {favouritesList?.length>0? favouritesList?.map((item: any) => {
                    return (
                        <ProductsCard type='product'
                            item={item}
                            handleFav={handleFavourite}
                            handleModelShow={modalShow} />
                    )
                }):<Text>No Favourites</Text>}
                {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />}
            </View>
        </ScrollView>
    )
}