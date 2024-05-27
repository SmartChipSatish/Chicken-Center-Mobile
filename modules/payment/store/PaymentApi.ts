import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ordersUrl } from '../../apiUrls/apiUrls';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${ordersUrl.url}/orders` }),
  tagTypes: ['payment'],
  endpoints: () => ({}),
});

