import { AvailableBouquetsProps } from '../../Components/AvailableBouquetsList/AvailableBouquetsList';
import { api } from '../../features/index';
import { IActions } from '../../interfaces/IActions';
import { IAvailableBouquet, IAvailableBouquets } from '../../interfaces/IAvailableBouquets';

const availableBouquetsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllAvailableBouquets: build.query<IAvailableBouquets[], void>({
			query: () => '/sales/showcase',
			providesTags: () => [{ type: 'AvailableBouquets', id: 'LIST' }],
		}),
		getAvailableBouquetById: build.query<IActions[], number | string>({
			query: (id) => `/sales/showcase/${id}`,
		}),
		editAvailableBouquet: build.mutation<IAvailableBouquet, { id: string; bouquet: Partial<IAvailableBouquet> }>({
			query: ({ id, bouquet }) => ({
				url: `/sales/${id}`,
				method: 'PUT',
				body: bouquet,
			}),
			invalidatesTags: ['AvailableBouquets'],
		}),
	}),
});

export const {
	useGetAllAvailableBouquetsQuery,
	useGetAvailableBouquetByIdQuery,
	useEditAvailableBouquetMutation,
} = availableBouquetsApi;
