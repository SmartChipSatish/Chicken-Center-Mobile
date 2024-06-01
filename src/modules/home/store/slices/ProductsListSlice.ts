import { createSlice } from '@reduxjs/toolkit';
import { itemData, itemsDetails } from '../../utils/constents';

interface ProductList {
    addProducts: itemData[];
}
const initialState: ProductList = {
    addProducts: [],
}
const ProductsListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setAddProducts: (state, action) => {
            let payload = action.payload;
            if (payload.type === 'cart') {
                state.addProducts = payload.data
            } else {
                let data;
                if (payload.data) {
                    data = payload?.data.map((e: any) => {
                        return { ...e, quantity: 1, showQuantity: false }
                    })
                }

                state.addProducts = data;
            }

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
        },
        setQuantity: (state, action) => {
            const payload = action.payload
            const data = state.addProducts.map((e) => {
                if (e.id === payload.id) {
                    return { ...e, quantity: payload.quantity }
                } else {
                    return e
                }
            })
            state.addProducts = data
        },
        setShowQuantity: (state, action) => {
            const playload = action.payload
            const newDetails = state.addProducts.map((e) => {
                if (e.id === playload.id) {
                    return { ...e, showQuantity: !e.showQuantity }
                } else {
                    return e
                }
            })
            state.addProducts = newDetails
        }, setShowQuantityReset: (state, action) => {
            const newDetails = state.addProducts.map((e) => {
                return { ...e, showQuantity: false }
            })
            state.addProducts = newDetails
        }
    }
});

export const { setAddProducts, setQuantity, setFavourite, setShowQuantity, setShowQuantityReset } = ProductsListSlice.actions;
export default ProductsListSlice;