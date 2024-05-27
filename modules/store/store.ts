import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";
import cartProductsSlice from "../Home/store/slices/CartProductsSlice";
import locationsSlice from "../Account/Store/LocationSlice";
import { productsApi } from "./services/productsApi";
import { ordersApi } from "../Orders/store/OrdersApi";
import { paymentApi } from "../payment/store/PaymentApi";


const store = configureStore({
    reducer: {
        products:ProductsListSlice.reducer,
        cartProducts:cartProductsSlice.reducer,
        locations:locationsSlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath] : ordersApi.reducer,
        [paymentApi.reducerPath] : paymentApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware,
                                      ordersApi.middleware,
                                      paymentApi.middleware)     
    })

export type RootState = ReturnType<typeof store.getState>;
export default store;