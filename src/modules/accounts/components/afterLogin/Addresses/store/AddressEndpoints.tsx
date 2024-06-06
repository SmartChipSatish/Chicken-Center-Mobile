import { addressApi } from "./AddressApi";


export const ordersService = addressApi.injectEndpoints({

    endpoints: (builder) => ({

        createAddress: builder.mutation({
            query: ({ id, user }) => ({
                url: `/addAddress?userId=${id}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['address'],
        }),
        getAddressByuser: builder.mutation({
            query: (id) => ({
                url: `/getUserById?userId=${id}`,
                method: 'GET'
            }),
            invalidatesTags: ['address'],
        }),
        // https://food-delivery-ekjr.onrender.com/users/getUserById?userId=6656acc3fb0769e9e7cb053f
        updateAddress: builder.mutation({
            query: ({ id, user }) => ({
                url: `/updateAddress?userId=${id}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['address'],
        }),




    })

});

export const {
    useCreateAddressMutation,
    useGetAddressByuserMutation,
    useUpdateAddressMutation
} = ordersService;