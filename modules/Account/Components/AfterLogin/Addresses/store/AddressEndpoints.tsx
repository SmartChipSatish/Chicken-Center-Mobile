import { addressApi } from "./AddressApi";


export const ordersService = addressApi.injectEndpoints({
   
    endpoints: (builder) => ({
        createAddress: builder.mutation({
            query: ({id,user}) => ({
                url: `/addAddress?userId=${id}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['address'],
        }),


      
    })

});

export const {
   useCreateAddressMutation
} = ordersService;