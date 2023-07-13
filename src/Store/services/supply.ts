import { ISupplies } from '../../interfaces/ISupply';
import { api } from '../../features';
import { Supply } from '../../Container/Supply/AddSupply';

interface Limit {
	start: number;
	end: number;
}

const suppliesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSuppliesBetween: build.mutation<Array<ISupplies>, Limit>({
			query: (Limit) =>
				`/supply/pagination?start=${Limit.start}&end=${Limit.end}`,
		}),
		getSuppliesSupplier: build.mutation<Array<ISupplies>, number>({
			query: (id) => `/supply/supplier?supplier_id=${id}`,
		}),
		addsupply: build.mutation<Supply, Supply>({
			query: (newSupply) => ({
				url: '/supply',
				method: 'POST',
				body: newSupply,
			}),
		}),
	}),
});

export const {
	useGetSuppliesBetweenMutation,
	useGetSuppliesSupplierMutation,
	useAddsupplyMutation,
} = suppliesApi;
