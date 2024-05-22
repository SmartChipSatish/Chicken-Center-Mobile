import {createSlice} from '@reduxjs/toolkit';
import { itemsDetails } from '../../../Dashboard/utlis/constents';

interface ProductList {
    cartProducts:itemsDetails[]
}
const initialState:ProductList ={
    cartProducts:[]
}
const cartProductsSlice = createSlice({
    name: 'cartproducts',
    initialState,
    reducers:{
        setCartProducts: (state, action) => {
            state.cartProducts.push(action.payload);
        },
    }
});

export const {setCartProducts} = cartProductsSlice.actions;
export default cartProductsSlice;