import {createSlice} from '@reduxjs/toolkit';
interface ProductList {
    addProducts:any[]
}
const initialState:ProductList ={
 addProducts:[]
}
const ProductsListSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        setAddProducts: (state, action) => {
            state.addProducts.push(action.payload);
        }
    }
});

export const {setAddProducts} = ProductsListSlice.actions;
export default ProductsListSlice;