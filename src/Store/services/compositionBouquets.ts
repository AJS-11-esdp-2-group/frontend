import { api } from '../../features/index';
import {
	ICompositionBouquets,
	ICompositionBouquet,
} from '../../interfaces/ICompositionBouquets';

const compositionBouquetsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCompositionBouquetById: build.query<
			ICompositionBouquets[],
			number | string
		>({
			query: (id) => `/compositionBouquets/${id}`,
		}),
		createCompositionBouquet: build.mutation<
			ICompositionBouquets,
			ICompositionBouquet
		>({
			query: (compositionBouquet) => ({
				url: '/compositionBouquets',
				method: 'POST',
				body: compositionBouquet,
			}),
			invalidatesTags: ['CompositionBouquets'],
		}),
	}),
});

export const {
	useGetCompositionBouquetByIdQuery,
	useCreateCompositionBouquetMutation,
} = compositionBouquetsApi;
