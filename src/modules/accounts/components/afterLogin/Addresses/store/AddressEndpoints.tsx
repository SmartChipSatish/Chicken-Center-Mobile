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
        getAddressByuser: builder.mutation({
            query: (id) => ({
                url: `/getUserById?userId=${id}`,
                method: 'GET'
            }),
            invalidatesTags: ['address'],
        }),


      
    })

});

export const {
   useCreateAddressMutation,
   useGetAddressByuserMutation
} = ordersService;