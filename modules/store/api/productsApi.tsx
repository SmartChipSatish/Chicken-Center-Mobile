
import { createApi } from '@reduxjs/toolkit/query/react'
import { Headers } from './AuthHeaders'
import { ApiUrls } from './Config'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: Headers(
    ApiUrls.items
  ),
  endpoints: () => ({

  }),
})

