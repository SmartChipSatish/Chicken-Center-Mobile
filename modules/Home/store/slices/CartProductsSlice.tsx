import {createSlice} from '@reduxjs/toolkit';
import { cartPriceDetails, cartProducts, itemData } from '../../utils/constents';

interface ProductList {
    cartProducts:itemData[],
    cartPriceDetails:cartPriceDetails
}
const initialState:ProductList ={
    cartProducts:[],
    cartPriceDetails:{
        itemPrice: 0,
        addons: 0,
        discount: 0,
        couponDiscount: 0,
        deliveryFee: 0,
        total: 0
    }
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
        },
        setCartPrices:(state,action)=>{
           state.cartPriceDetails=action.payload
        }
    }
});

export const {setCartProducts, setcardQuantity,setRemoveItem, setCartPrices} = cartProductsSlice.actions;
export default cartProductsSlice;