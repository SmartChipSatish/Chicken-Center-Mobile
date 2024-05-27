import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ProductItem from './AddItemModal';
import { useDispatch, useSelector } from 'react-redux';
import { QUANTITY_LIMIT, itemData } from '../../utils/constents';
import { RootState } from '../../../store/store';
import { setFavourite, setQuantity, setShowQuantity } from '../../store/slices/ProductsListSlice';
import ProductsCard from './ProductCard';
import { Text } from 'react-native';
import { setCartProducts, setRemoveItem, setcardQuantity } from '../../store/slices/CartProductsSlice';

const ProductsList = () => {
    const navigate = useNavigation<any>();
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState<string>('');
    const handleClose = () => {
        setShow(false)
    }
    const products = useSelector((store: RootState) => store.products.addProducts);
    const modalShow = (e: { stopPropagation: () => void }, itemId: string) => {
        e.stopPropagation();
        setShow(true)
        setProductId(itemId);
    }
    const dispatch = useDispatch()
    const handleFavourite = (item: any) => {
        dispatch(setFavourite(item))
    }

    const handelAddCart=(id:string)=>{
      dispatch(setShowQuantity({id:id}));
      const cartItem= products.filter((e)=>(e.id===id))[0];
      dispatch(setCartProducts({...cartItem,total: cartItem.itemPrice}));
    }

    const handleQuantity = (type: string,item:itemData) => {
        if (type === 'add' && item.quantity !== QUANTITY_LIMIT) {
            const quantity = item?.quantity + 1
            const amount = (item?.itemPrice * quantity) || 0;
            dispatch(setQuantity({ id: item.id, quantity: quantity }));
            dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount }));
        } else if (type === 'remove' && item.quantity !== 1) {
            const quantity = item?.quantity - 1
            dispatch(setQuantity({ id: item.id, quantity: item?.quantity - 1 }))
            const amount = (item?.itemPrice * quantity) - item.itemPrice || 0;
            dispatch(setcardQuantity({ id: item.id, quantity: quantity, total: amount }));
        }else if (item.quantity === 1 && type === 'remove') {
            dispatch(setRemoveItem({ id: item.id }));
            dispatch(setShowQuantity({id:item.id}));
        }
    }

    return (
        <>
            {products?.length>0 ? products.map((e: itemData) => {
                return <ProductsCard item={e}
                                     key={e.id}
                                     handleFav={handleFavourite}
                                     handleModelShow={modalShow}
                                     type='product' 
                                     handelAddCart={handelAddCart}
                                     handleQuantity={handleQuantity}/>
            }):<Text>Loding....</Text>}
            {/* {show && <ProductItem show={show} handleClose={handleClose} productId={productId} />} */}

        </>
    )
}

export default ProductsList
