  import { apiUrl } from '../../common/constans';
  import { RootState } from '../services/store';
  import { CustomError } from '../../interfaces/errors/CustomError';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
  } from '@reduxjs/toolkit/query/react';
  
  export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: apiUrl,
      prepareHeaders: (headers, { getState }) => {
        const state: RootState = getState();
        const token = state.auth.user?.token;
        if (token) {
          headers.set('Authorization', token);
        }
      },
    }) as BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError | CustomError | { error: object },
      {},
      FetchBaseQueryMeta
    >,
    endpoints: () => ({}),
    tagTypes: ['Items', 'Suppliers'],
});