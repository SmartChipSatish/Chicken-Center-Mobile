import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";
import cartProductsSlice from "../Home/store/slices/CartProductsSlice";
import locationsSlice from "../Account/Store/LocationSlice";
import { productsApi } from "./api/productsApi";
import { userApi } from "./api/userApi";
import { getUserData } from "../Auth/services/getUserDEtails";


const store = configureStore({
    reducer: {
        products: ProductsListSlice.reducer,
        cartProducts: cartProductsSlice.reducer,
        locations: locationsSlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [getUserData.reducerPath]: getUserData.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware, getUserData.middleware),


})

export type RootState = ReturnType<typeof store.getState>;
export default store;


