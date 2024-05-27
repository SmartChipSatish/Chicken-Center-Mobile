
import { createApi } from '@reduxjs/toolkit/query/react'
import { Headers } from './AuthHeaders'
import { ApiUrls } from './Config'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: Headers(
        ApiUrls.users
      ),
    tagTypes: ['userList'],
    endpoints: () => ({}),
})

