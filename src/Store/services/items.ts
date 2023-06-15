import { Items } from '../../interfaces/Items';
import { api } from '../../features/index';
;

const itemsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllItems: build.query<Items[], void>({
            query: () => '/items',
            providesTags: () => [{ type: 'Items', id: 'LIST' }],
        }),
        getItemById: build.query<Items, number>({
            query: (id) => `/items/${id}`,
        }),
        addItem: build.mutation<Items, FormData>({
            query: (item) => ({
                url: '/items',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Items'],
        }),
        deleteItem: build.mutation<void, number>({
            query: (itemId) => ({
                url: `/items/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Items'],
        }),
    }),
});

export const { useGetAllItemsQuery, useGetItemByIdQuery, useAddItemMutation, useDeleteItemMutation } = itemsApi;