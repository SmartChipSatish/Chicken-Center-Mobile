import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";


const store = configureStore({
    reducer: {
        products:ProductsListSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;