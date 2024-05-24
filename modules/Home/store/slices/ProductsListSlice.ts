import {createSlice} from '@reduxjs/toolkit';
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
            let payload=action.payload;
            console.log(payload,'kkkk')
            let data;
            if(action.payload){
                 data=payload.map((e:any)=>{
                    return {...e,quantity:1}
                })
            }
           
            state.addProducts = data;
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
        setQuantity:(state, action)=>{
          const payload = action.payload
          const data=state.addProducts.map((e)=>{
            if(e.id === payload.id){
                return {...e,quantity:payload.quantity}
            }else{
                return e
            }
          })
          state.addProducts = data
        },
    }
});

export const { setAddProducts, setQuantity, setFavourite } = ProductsListSlice.actions;
export default ProductsListSlice;