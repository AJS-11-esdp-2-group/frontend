import { api } from '../../features';
import { IOrders } from '../../interfaces/IOrder';

const ordersApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllOrders: build.query<IOrders[], void>({
			query: () => '/sales',
			providesTags: () => [{ type: 'Orders', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetAllOrdersQuery
} = ordersApi;
