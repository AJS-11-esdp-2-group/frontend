import {api} from "./index";

const crmApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllGoods: build.query<any, any>({
            query: () => `/goods`,
            providesTags: () => [{type: 'Goods', id: 'LIST'}]
        }),
        getGoodsById: build.query<any, any>({
            query: (id) => `/goods/:${id}`
        }),
        getAllSuppliers: build.query<any, any>({
            query: () => `/suppliers`,
            providesTags: () => [{type: 'Suppliers', id: 'LIST'}]
        }),
        getSuppliersById: build.query<any, any>({
            query: (id) => `/suppliers/:${id}`
        }),
    }),
    overrideExisting: false,
})

export const {useGetAllGoodsQuery, useGetAllSuppliersQuery} = crmApi