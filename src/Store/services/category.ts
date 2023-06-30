import ICategory from '../../interfaces/ICategory';
import { api } from '../../features/index';

const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllcategories: build.query<ICategory[], void>({
            query: () => '/items_category',
            providesTags: () => [{type: 'Categories'}],
        }),
        getCategoryById: build.query<ICategory[], number | string>({
            query: (id) => `/items_category/${id}`,
        }),
        deleteCategory: build.mutation<void, number>({
            query: (categoryId) => ({
                url: `/items_category/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useGetAllcategoriesQuery,
    useGetCategoryByIdQuery,
    useDeleteCategoryMutation,  
} = categoryApi;