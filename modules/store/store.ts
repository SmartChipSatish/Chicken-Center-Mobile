import { configureStore } from "@reduxjs/toolkit";
import ProductsListSlice from "../Home/store/slices/ProductsListSlice";
import cartProductsSlice from "../Home/store/slices/CartProductsSlice";
import locationsSlice from "../Account/Store/LocationSlice";
import { productsApi } from "./api/productsApi";
import { userApi } from "./api/userApi";
import { ordersApi } from "../Orders/store/OrdersApi";
import { paymentApi } from "../payment/store/PaymentApi";
import { addressApi } from "../Account/Components/AfterLogin/Addresses/store/AddressApi";


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


