import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";
import cartProductsSlice from "../Home/store/slices/CartProductsSlice";
import locationsSlice from "../Account/Store/LocationSlice";


const store = configureStore({
    reducer: {
        products:ProductsListSlice.reducer,
        cartProducts:cartProductsSlice.reducer,
        locations:locationsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;