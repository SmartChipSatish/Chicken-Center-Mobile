import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// `http:192.168.1.4:8000/users`
export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://food-delivery-ekjr.onrender.com/users` }),
  tagTypes: ['address'],
  endpoints: () => ({}),
});

