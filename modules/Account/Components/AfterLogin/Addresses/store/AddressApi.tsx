import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http:192.168.1.4:8000/users` }),
  tagTypes: ['address'],
  endpoints: () => ({}),
});

