import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIENDPOINTS } from '../../../../apiUrls/apiUrls';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${APIENDPOINTS.URL}/orders` }),
  tagTypes: ['payment'],
  endpoints: () => ({}),
});

