import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../modules/home/store/slices/ProductsListSlice";
import cartProductsSlice from "../modules/home/store/slices/CartProductsSlice";
import locationsSlice from "../modules/accounts/store/slices/LocationSlice";
import { productsApi } from "../modules/home/store/services/productsApi";
import { userApi } from "../modules/auth/store/services/userApi";
import { ordersApi } from "../modules/orders/store/services/OrdersApi";
import { addressApi } from "../modules/accounts/components/afterLogin/Addresses/store/AddressApi";
import { paymentApi } from "../modules/payment/store/services/PaymentApi";


const store = configureStore({
    reducer: {
        products: ProductsListSlice.reducer,
        cartProducts: cartProductsSlice.reducer,
        locations: locationsSlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ordersApi.reducerPath] : ordersApi.reducer,
        [paymentApi.reducerPath] : paymentApi.reducer,
        [addressApi.reducerPath]:addressApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware,
                                      ordersApi.middleware,
                                      paymentApi.middleware,
                                    addressApi.middleware)     
    

})

export type RootState = ReturnType<typeof store.getState>;
export default store;

