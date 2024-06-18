import { ItemsResponse, itemData } from "../../utils/constents";
import { productsApi } from "./productsApi";

export const getAllPrducts = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page }) => ({
        url: `/items/getAllItems?page=${page}&perPage=10`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return response;
      },

    }),
    getItemsDetails: builder.mutation({
      query: (id) => ({
        url: '/items/getAllItems',
        method: 'GET',
      }),
    }), searchProductsList: builder.mutation({
      query: (name) => ({
        url: `/items/searchItems?name=${name}`,
        method: 'GET'
      })
    })
  }),
})

export const { useGetAllProductsQuery, useGetItemsDetailsMutation, useLazyGetAllProductsQuery, useSearchProductsListMutation } = getAllPrducts