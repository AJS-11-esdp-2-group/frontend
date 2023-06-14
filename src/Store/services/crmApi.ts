import { api } from "../../features/index";

const crmApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllItems: build.query<any, void>({
      query: () => `/items`,
      providesTags: () => [{ type: "Items", id: "LIST" }]
    }),
    getAllSuppliers: build.query<any, void>({
      query: () => `/suppliers`,
      providesTags: () => [{ type: "Items", id: "LIST" }]
    })
  }),
  overrideExisting: false
});

export const { useGetAllItemsQuery, useGetAllSuppliersQuery } = crmApi;
