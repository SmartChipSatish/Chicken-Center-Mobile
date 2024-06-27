import { createSlice } from '@reduxjs/toolkit'
import { resetAll } from '../../../../store/slices/ResetSlice';

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
    },extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
      }
})

export const { setOrderCount } = OrderItemsSlice.actions;
export default OrderItemsSlice;