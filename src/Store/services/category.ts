import ICategory from '../../interfaces/ICategory';
import { api } from '../../features/index';

const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllcategories: build.query<ICategory[], void>({
            query: () => '/items_category',
            providesTags: () => [{type: 'Categories'}],
        }),
    }),
});

export const {useGetAllcategoriesQuery} = categoryApi;