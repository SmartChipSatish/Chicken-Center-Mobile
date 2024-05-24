
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://food-delivery-ekjr.onrender.com' }),
  endpoints: () => ({
    
  }),
})

