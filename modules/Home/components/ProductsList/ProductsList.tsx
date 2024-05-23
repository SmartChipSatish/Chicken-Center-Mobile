import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ProductItem from './AddItemModal';
import { useDispatch, useSelector } from 'react-redux';
import { itemsDetails } from '../../utils/constents';
import { RootState } from '../../../store/store';
import { setFavourite } from '../../store/slices/ProductsListSlice';
import ProductsCard from './ProductCard';

const ProductsList = () => {
    const navigate = useNavigation<any>();
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState<number>(0);
    const handleClose = () => {
        setShow(false)
    }
    const products = useSelector((store: RootState) => store.products.addProducts);;
    const modalShow = (e: { stopPropagation: () => void }, itemId: number) => {
        e.stopPropagation();
        setShow(true)
        setProductId(itemId);
    }
    const dispatch = useDispatch()
    const handleFavourite = (item: any) => {
        console.log(item, 'item')
        dispatch(setFavourite(item))
    }
    return (
        <>
            {products.map((e: itemsDetails) => {
                return <ProductsCard item={e}
                    handleFav={handleFavourite}
                    handleModelShow={modalShow}
                    type='product' />
            })}
            {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />}

        </>
    )
}

export default ProductsList
