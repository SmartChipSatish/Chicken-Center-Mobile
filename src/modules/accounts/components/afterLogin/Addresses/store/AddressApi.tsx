import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIENDPOINTS } from '../../../../../../apiUrls/apiUrls';

// `http:192.168.1.4:8000/users`
export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({ baseUrl: APIENDPOINTS.URL }),
  tagTypes: ['address'],
  endpoints: () => ({}),
});