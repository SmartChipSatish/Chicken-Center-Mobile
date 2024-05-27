

import { paymentApi } from "./PaymentApi";

export const paymentService = paymentApi.injectEndpoints({

    endpoints: (builder) => ({


        initiateOrder: builder.mutation({
            query: order => ({
                url: '/initiateOrder',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['payment'],
        }),

        verifyOrder: builder.mutation({
            query: orderId => ({
                url: '/paymentVerify',
                method: 'POST',
                body: orderId
            }),
            invalidatesTags: ['payment']
        })
    })

});

export const {
useInitiateOrderMutation,
useVerifyOrderMutation
} = paymentService;