import { itemData } from "../../utils/constents";
import { productsApi } from "./productsApi";

export const getAllPrducts = productsApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllProducts: builder.query<itemData[], void>({
        query: () => ({
          url: '/items/getAllItems',
          method: 'GET',
        }),
        transformResponse: (response: itemData[] ) => {
          return response;
        },
      }),
    getItemsDetails: builder.mutation({
      query: (id) => ({
        url: '/items/getAllItems',
        method: 'GET',
      }),
    })
  }),
})

export const { useGetAllProductsQuery, useGetItemsDetailsMutation , useLazyGetAllProductsQuery} = getAllPrducts