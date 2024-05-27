import { itemData } from "../../Home/utils/constents";
import { productsApi } from "../api/productsApi";

export const getAllPrducts = productsApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllProducts: builder.query<itemData[], void>({
        query: () => ({
          url: '/getAllItems',
          method: 'GET',
        }),
        transformResponse: (response: itemData[] ) => {
          return response;
        },
      }),
    getItemsDetails: builder.mutation({
      query: (id) => ({
        url: '/getAllItems',
        method: 'GET',
      }),
    })
  }),
})

export const { useGetAllProductsQuery, useGetItemsDetailsMutation , useLazyGetAllProductsQuery} = getAllPrducts