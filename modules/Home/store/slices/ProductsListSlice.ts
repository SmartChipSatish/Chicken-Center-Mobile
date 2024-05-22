import { createSlice } from '@reduxjs/toolkit';
import { itemsDetails } from '../../../Dashboard/utlis/constents';

interface ProductList {
    addProducts: itemsDetails[];
}
const initialState: ProductList = {
    addProducts: [],
}
const ProductsListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setAddProducts: (state, action) => {
            state.addProducts = action.payload;
        },
        setQuantity: (state, action) => {
            const payload = action.payload
            console.log(payload, 'payload');
            const index = state.addProducts.findIndex((item) => item.id === payload.id)
            const data = state.addProducts.map((e) => {
                if (e.id === payload.id) {
                    return { ...e, quantity: payload.quantity }
                } else {
                    return e
                }
            })
            state.addProducts = data
        },
        setFavourite: (state, action) => {
            const payload = action.payload
            const data = state.addProducts.map((item) => {
                if (item.id === payload.id) {
                    return { ...item, favourite: !(payload.favourite) }
                } else {
                    return item
                }
            })
            state.addProducts = data
        }
    }
});

export const { setAddProducts, setQuantity, setFavourite } = ProductsListSlice.actions;
export default ProductsListSlice;