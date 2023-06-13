export * from './store'
export * from './crmApi'


// import {
//     BaseQueryFn,
//     createApi,
//     FetchArgs,
//     fetchBaseQuery,
//     FetchBaseQueryError,
//     FetchBaseQueryMeta
// } from '@reduxjs/toolkit/query/react';
// import {apiUrl} from "../../common/constans";
// import {RootState} from "./store";
// import {CustomError} from "../../interfaces/errors/CustomError";
//
// export const api = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: apiUrl,
//         prepareHeaders: (headers, {getState}) => {
//             const state: RootState = getState();
//             const token = state.auth.user?.token;
//             if (token) {
//                 headers.set('Authorization', token);
//             }
//         }
//     }) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError  | CustomError | {error: object}, {}, FetchBaseQueryMeta>,
//     endpoints: () => ({}),
//     tagTypes: ['Items', 'Suppliers'],
// })