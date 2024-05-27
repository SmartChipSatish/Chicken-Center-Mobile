import { productsApi } from "../api/productsApi";

export const getAllPrducts = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/items/getAllItems',
    }),
    getItemsDetails: builder.mutation({
      query: (id) => ({
        url: '/items/getAllItems',
        method: 'GET',
      }),
    })
  }),
})

export const { useGetAllProductsQuery, useGetItemsDetailsMutation } = getAllPrducts