import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIENDPOINTS } from '../../../../apiUrls/apiUrls';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${APIENDPOINTS.URL}/orders` }),
  tagTypes: ['orders'],
  endpoints: () => ({}),
});

