import { productsApi } from "../api/productsApi";

export const getAllPrducts = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/getAllItems',
    }),
  }),
})

export const { useGetAllProductsQuery } = getAllPrducts