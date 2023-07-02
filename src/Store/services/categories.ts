import { ICategories, ICategory } from '../../interfaces/ICategories';
import {ISubcategories} from '../../interfaces/ISubcategories';
import { api } from '../../features/index';

const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllcategories: build.query<ICategories[], void>({
            query: () => '/items_category',
            providesTags: () => [{ type: 'Categories' }],
        }),
        getCategoryById: build.query<ICategories[], number | string>({
            query: (id) => `/items_category/${id}`,
        }),
        getSubcategoriesByIdCategory: build.query<ISubcategories[], void>({
            query: (id) => `/items_subcategory?id_category=${id}`,
        }),
        addCategory: build.mutation<ICategories, ICategory>({
            query: (items_category) => ({
                url: '/items_category',
                method: 'POST',
                body: items_category,
            }),
            invalidatesTags: ['Categories'],
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
    useGetSubcategoriesByIdCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;