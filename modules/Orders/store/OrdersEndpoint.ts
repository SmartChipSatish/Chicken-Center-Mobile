
import { ordersApi } from "./OrdersApi";

export const ordersService = ordersApi.injectEndpoints({

    endpoints: (builder) => ({

        getAllOrders: builder.query<any, any>({
            query: () => '/getAllOrders',
            keepUnusedDataFor: 600,
            // transformResponse: (response: any) => response?.status ? response?.data : [],
            // transformErrorResponse: (response: any) => console.log('Error: \n', response),
            providesTags: ['orders'],
        }),

        getOrdersByUserId: builder.mutation({
            query: (id) => ({
                url: `/getOrdersByUserId?userId=${id}`,
                method: 'GET'
            }),
            invalidatesTags: ['orders'],
        }),

        getOrderById: builder.mutation({
            query: (orderId) => ({
                url: `/getOrderById?orderId=${orderId}`,
                method: 'GET'
            }),
            invalidatesTags: ['orders']
        }),

        createOrder: builder.mutation({
            query: order => ({
                url: '/createOrder',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['orders'],
        }),

        updateOrder: builder.mutation({
            query: order => ({
                url: '/updateOrder',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['orders']
        })
    })

});

export const {
    useGetAllOrdersQuery,
    useCreateOrderMutation,
    useGetOrderByIdMutation,
    useGetOrdersByUserIdMutation,
    useUpdateOrderMutation
} = ordersService;