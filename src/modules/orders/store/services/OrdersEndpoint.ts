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
        getOrdersByUserId1: builder.query<any, any>({
            query: ({id,page,pageSize}) => `/getOrdersByUserId?userId=${id}&page=${page}&pageSize=${pageSize}`,
            transformResponse: (response) => {
              return response;
            },
          }), 
        getOrdersByUserId: builder.mutation({
            query: ({ userId, page, limit, orderStatus, orderStatusMain }:any) => {
                console.log(userId, page, limit, orderStatus, orderStatusMain,'dheeraj')
                let url = `/getOrdersByUserId?userId=${userId}&page=${page}&limit=${limit}&orderStatus=${orderStatus}`;
                if (orderStatusMain) {
                    url += `&orderStatus=${orderStatusMain}`;
                }
                return {
                    url,
                    method: 'GET',
                };
            },
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
            query: ({orderId, orderStatus}) =>{ 
                return {
                url: `/updateOrder?orderId=${orderId}`,
                method: 'POST',
                body:{ orderStatus}
            }},
            invalidatesTags: ['orders']
        })
    })

});


export const {
    useGetAllOrdersQuery,
    useCreateOrderMutation,
    useGetOrderByIdMutation,
    useGetOrdersByUserIdMutation,
    useUpdateOrderMutation,
    useLazyGetOrdersByUserId1Query
    
} = ordersService;