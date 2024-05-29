
import { createApi } from '@reduxjs/toolkit/query/react'
import { Headers } from '../../../../store/services/AuthHeaders'
import { APIENDPOINTS } from '../../../../apiUrls/apiUrls'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: Headers(
        APIENDPOINTS.URL
      ),
    tagTypes: ['userList'],
    endpoints: () => ({}),
})

