import { productsApi } from "./productsApi";

export const getAllPrducts= productsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
          query: () => '/items/getAllItems',
        }),
      }),
})

export const {useGetAllProductsQuery} =  getAllPrducts