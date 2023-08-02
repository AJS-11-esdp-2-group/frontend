import { api } from '../../features/index';
import { IActions } from '../../interfaces/IActions';
import { IAvailableBouquet, IAvailableBouquets, ISendToShowCase } from '../../interfaces/IAvailableBouquets';

const availableBouquetsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllAvailableBouquets: build.query<IAvailableBouquets[], void>({
			query: () => '/sales/showcase',
			providesTags: () => [{ type: 'AvailableBouquets', id: 'LIST' }],
		}),
		getAvailableBouquetById: build.query<IActions[], number | string>({
			query: (id) => `/sales/showcase/${id}`,
		}),
		editAvailableBouquet: build.mutation<IAvailableBouquet, { id: number; bouquet: Partial<IAvailableBouquet> }>({
			query: ({ id, bouquet }) => ({
				url: `/sales/${id}`,
				method: 'PUT',
				body: {
					total_sum: bouquet.total_sum,
					count: bouquet.count,
				},
			}),
			invalidatesTags: ['AvailableBouquets'],
		}),
		createAvailableBouquet: build.mutation<IAvailableBouquets[], ISendToShowCase>({
			query: (bouquet) =>({
				url: '/sales/showcase',
				method: 'POST',
				body: bouquet,
			}),
		}),
	}),
});

export const {
	useGetAllAvailableBouquetsQuery,
	useGetAvailableBouquetByIdQuery,
	useEditAvailableBouquetMutation,
	useCreateAvailableBouquetMutation,
} = availableBouquetsApi;
