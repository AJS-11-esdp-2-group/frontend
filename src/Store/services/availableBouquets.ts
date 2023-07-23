import { api } from '../../features/index';
import { IAvailableBouquet, IAvailableBouquets } from '../../interfaces/IAvailableBouquets';

const availableBouquetsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllAvailableBouquets: build.query<IAvailableBouquets[], void>({
			query: () => '/sales/showcase',
			providesTags: () => [{ type: 'AvailableBouquets', id: 'LIST' }],
		}),
		getAvailableBouquetById: build.query<IAvailableBouquet[], number>({
			query: (id) => `/sales/showcase/${id}`,
		}),
	}),
});

export const {
	useGetAllAvailableBouquetsQuery,
	useGetAvailableBouquetByIdQuery,
} = availableBouquetsApi;
