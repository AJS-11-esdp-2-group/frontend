import { ISubcategories } from '../../interfaces/ISubcategories';
import { api } from '../../features/index';
import { IUnderSubcategory } from '../../interfaces/underSubcategory';

const subcategoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllSubcategories: build.query<ISubcategories[], void>({
			query: () => '/items_subcategory',
			providesTags: () => [{ type: 'Subcategories' }],
		}),
		getSubcategoryById: build.query<ISubcategories[], number | string>({
			query: (id) => `/items_subcategory/${id}`,
		}),
		deleteSubcategory: build.mutation<void, number>({
			query: (subcategoryId) => ({
				url: `/items_subcategory/${subcategoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Subcategories'],
		}),
		getUnderSubcategoriesByIdCategory: build.query<IUnderSubcategory[], number>({
			query: (id) => `/items_under_subcategory?items_subcategory=${id}`,
		}),
	}),
});

export const {
	useGetAllSubcategoriesQuery,
	useGetSubcategoryByIdQuery,
	useDeleteSubcategoryMutation,
	useGetUnderSubcategoriesByIdCategoryQuery,
} = subcategoryApi;
