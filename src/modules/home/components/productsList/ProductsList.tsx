import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { itemData } from '../../utils/constents';
import { RootState } from '../../../../store/store';
import { setFavourite } from '../../store/slices/ProductsListSlice';
import ProductsCard from './ProductCard';
import { Text, View } from 'react-native';
import { setUser } from '../../../accounts/store/slices/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateUserMutation } from '../../../auth/store/services/getUserDetailsService';
import Loding from '../../../dashboard/components/Loding';

const ProductsList = () => {

    const products = useSelector((store: RootState) => store.products.addProducts);
    const favouritesList = products.filter(item => item.favourite === true);
    const dispatch = useDispatch();
    const [productsList,setProductsList]=useState<itemData[]>([]);

    const [updateUser] = useUpdateUserMutation();
    const handleFavourite = async (item: any) => {
        try {
            const storeduserId = await AsyncStorage.getItem('userId');
            if (storeduserId) {
                const userId = storeduserId.replace(/['"]/g, '').trim();
                const isItemInFavourites = favouritesList.some(favItem => favItem.id === item.id);

                let updatedFavouritesList;
                if (isItemInFavourites) {
                    updatedFavouritesList = favouritesList.filter(favItem => favItem.id !== item.id);

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

    useEffect(()=>{
      const avaliableList:itemData[]=products.filter((e)=>e.globalItemStatus);
      const notAvaliableList:itemData[]=products.filter((e)=>!e.globalItemStatus);
      setProductsList(avaliableList.concat(notAvaliableList));
    },[products]);

    return (
        <>
            {productsList?.length > 0 ? productsList.map((e: itemData) => {
                return <ProductsCard item={e}
                    handleFav={handleFavourite}
                    type='product'
                />
            }) : <View style={{height:250}}>
                     <Loding />
                </View>}
            {/* {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />} */}

        </>
    )
}

export default ProductsList
