import { IUnderSubcategory } from '../../interfaces/underSubcategory';
import { api } from '../../features/index';

const underSubcategoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllUnderSubcategories: build.query<IUnderSubcategory[], void>({
			query: () => '/items_under_subcategory',
			providesTags: () => [{ type: 'UnderSubcategories', id: 'LIST' }],
		}),
		getUnderSubcategoryById: build.query<IUnderSubcategory[], number | string>({
			query: (id) => `/items_under_subcategory/${id}`,
		}),
		deleteUnderSubcategory: build.mutation<void, number>({
			query: (underSubcategoryId) => ({
				url: `/items_under_subcategory/${underSubcategoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['UnderSubcategories'],
		}),
	}),
});

export const {
	useDeleteUnderSubcategoryMutation,
	useGetAllUnderSubcategoriesQuery,
	useGetUnderSubcategoryByIdQuery,
} = underSubcategoryApi;
