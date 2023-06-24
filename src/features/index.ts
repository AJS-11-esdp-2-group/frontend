import { apiUrl } from "../common/constans";
import { RootState } from "../Store/services/store";
import { CustomError } from "../interfaces/errors/CustomError";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const state: RootState = getState();
      if (state.auth.user) {
        const token = state.auth.user[0]?.token;
        if (token) {
          headers.set("Authorization", token);
        }
      }
    }
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | CustomError | { error: object },
    {},
    FetchBaseQueryMeta
  >,
  endpoints: () => ({}),
  tagTypes: [
    "Items",
    "Suppliers",
    "Supplies",
    "Storages",
    "Sources",
    "Categories",
    "Countries",
    "Cities"
  ]
});
