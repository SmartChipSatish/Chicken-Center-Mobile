import { createSlice } from '@reduxjs/toolkit'

interface OrderItems {
    ordersCount:number
}

const initialState: OrderItems = {
    ordersCount: 0,
};

const OrderItemsSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        setOrderCount: (state, action) => {
            state.ordersCount = action.payload;
        },
    }
})

export const { setOrderCount } = OrderItemsSlice.actions;
export default OrderItemsSlice;