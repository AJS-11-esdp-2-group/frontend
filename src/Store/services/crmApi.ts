import {apiUrl} from "../../common/constans";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const crmApi = createApi({


    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}`}),
    endpoints: (build) => ({
        getAllItems: build.query<any, void>({
            query: () => 'goods',
        }),
        getAllSuppliers: build.query<any, void>({
            query: () => 'suppliers',
        }),

    })
})

export const {useGetAllItemsQuery, useGetAllSuppliersQuery} = crmApi