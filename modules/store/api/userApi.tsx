
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://food-delivery-ekjr.onrender.com/users' }),
    tagTypes: ['userList'],
    endpoints: () => ({}),
})

