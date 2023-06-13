import {apiUrl} from "../../common/constans";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const crmApi = createApi({
    reducerPath: 'itemsApi',
    tagTypes: ['Items'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}`}),
    endpoints: (build) => ({
        getAllItems: build.query<any, void>({
            query: () => 'goods',
            providesTags: () => [{type: 'Items', id: 'LIST'}]
        })
    })
})

export const {useGetAllItemsQuery} = crmApi