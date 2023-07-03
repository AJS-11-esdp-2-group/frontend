import { ISubcategories } from '../../interfaces/ISubcategories';
import { api } from '../../features/index';


const subcategoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllSubcategories: build.query<ISubcategories[], void>({
            query: () => '/items_subcategory',
            providesTags: () => [{type: 'Subcategories'}],
            
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
    }),
});

export const {
    useGetAllSubcategoriesQuery,
    useGetSubcategoryByIdQuery,
    useDeleteSubcategoryMutation,
} = subcategoryApi;