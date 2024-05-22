import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";
import cartProductsSlice from "../Home/store/slices/CartProductsSlice";


const store = configureStore({
    reducer: {
        products:ProductsListSlice.reducer,
        cartProducts:cartProductsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;