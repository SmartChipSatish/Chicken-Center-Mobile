
import { createApi } from '@reduxjs/toolkit/query/react'
import { Headers } from '../../../../store/services/AuthHeaders'
import { APIENDPOINTS } from '../../../../apiUrls/apiUrls'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: Headers(
    APIENDPOINTS.URL
  ),
  endpoints: () => ({

  }),
})

