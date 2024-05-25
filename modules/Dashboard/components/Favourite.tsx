import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { THEME_COLORS } from '../../GlobalStyles/GlobalStyles'
import ProductItem from '../../Home/components/ProductsList/AddItemModal'
import { setFavourite } from '../../Home/store/slices/ProductsListSlice'
import ProductsCard from '../../Home/components/ProductsList/ProductCard'
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
                {favouritesList.map((item: any) => {
                    return (
                        <ProductsCard type='product'
                            item={item}
                            handleFav={handleFavourite}
                            handleModelShow={modalShow} />
                    )
                })}
                {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />}
            </View>
        </ScrollView>
    )
}