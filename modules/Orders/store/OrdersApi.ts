import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ordersUrl } from '../../apiUrls/apiUrls';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${ordersUrl.url}/orders` }),
  tagTypes: ['orders'],
  endpoints: () => ({}),
});

