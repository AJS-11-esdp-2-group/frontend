import { ISupplies } from '../../interfaces/ISupply';
import { api } from '../../features';
import { Supply } from '../../Components/Invoices/AddInvoice';
import { IInvoice } from '../../interfaces/IInvoice'

interface limit {
	start: number;
	end: number;
}

const suppliesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllActions: build.query<IInvoice[], void>({
			query: () => '/supply/invoices',
			providesTags: () => [{ type: 'Suppliers', id: 'LIST' }],
		}),
		getSuppliesBetween: build.mutation<Array<ISupplies>, limit>({
			query: (limit) =>
				`/supply/pagination?start=${limit.start}&end=${limit.end}`,
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
	useGetAllActionsQuery
} = suppliesApi;
