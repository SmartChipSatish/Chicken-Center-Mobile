import {createSlice} from '@reduxjs/toolkit';
import { cartProducts } from '../../utils/constents';

interface ProductList {
    cartProducts:cartProducts[]
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
        setcardQuantity:(state, action)=>{
            const payload = action.payload
            console.log(payload,'loaddd')
            const data=state.cartProducts.map((e)=>{
              if(e.id === payload.id){
                  return {...e,quantity: payload?.quantity ,total:payload.total}
              }else{
                  return e
              }
            })
            state.cartProducts = data 
          },
          setRemoveItem:(state, action)=>{
            const payload = action.payload
            const details=state.cartProducts.filter((e)=>{
                return e.id !== payload.id
            })
            state.cartProducts =details
        }
    }
});

export const {setCartProducts, setcardQuantity,setRemoveItem} = cartProductsSlice.actions;
export default cartProductsSlice;