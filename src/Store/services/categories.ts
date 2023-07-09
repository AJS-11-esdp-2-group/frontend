import { ICategories, ICategory } from '../../interfaces/ICategories';
import { ISubcategories,ISubcategory } from '../../interfaces/ISubcategories';
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
		getSubcategoriesByIdCategory: build.query<ISubcategories[], number>({
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
		addSubCategory: build.mutation<ISubcategories, ISubcategory>({
			query: (items_subcategory) => ({
				url: '/items_subcategory',
				method: 'POST',
				body: items_subcategory,
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
		deleteSubCategory: build.mutation<void, number>({
			query: (subCategoryId) => ({
				url: `/items_subcategory/${subCategoryId}`,
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
	useAddSubCategoryMutation,
	useDeleteSubCategoryMutation,
} = categoryApi;
