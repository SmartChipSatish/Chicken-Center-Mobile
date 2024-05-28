import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { itemData } from '../../utils/constents';
import { RootState } from '../../../store/store';
import { setFavourite } from '../../store/slices/ProductsListSlice';
import ProductsCard from './ProductCard';
import { Text } from 'react-native';

const ProductsList = () => {

    const products = useSelector((store: RootState) => store.products.addProducts);
    const dispatch = useDispatch();

    const handleFavourite = (item: any) => {
        dispatch(setFavourite(item))
    }

    return (
        <>
            {products?.length>0 ? products.map((e: itemData) => {
                return <ProductsCard item={e}
                                     handleFav={handleFavourite}
                                     type='product' 
                                     />
            }):<Text>Loding....</Text>}
            {/* {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />} */}

        </>
    )
}

export default ProductsList
