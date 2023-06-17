import { api } from '../../features/index';
import { ISupplier, ISuppliers } from '../../interfaces/ISuppliers';

const suppliersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSuppliers: build.query<ISuppliers[], void>({
      query: () => '/suppliers',
      providesTags: () => [{ type: 'Items', id: 'LIST' }],
    }),
    getSupplierById: build.query<ISuppliers, number>({
      query: (id) => `/suppliers/${id}`,
    }),
    addSupplier: build.mutation<ISuppliers, ISupplier>({
      query: (supplier) => ({
        url: '/suppliers',
        method: 'POST',
        body: supplier,
      }),
      invalidatesTags: ['Suppliers'],
    }),
    deleteSupplier: build.mutation<void, number>({
      query: (supplierId) => ({
        url: `/suppliers/${supplierId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Suppliers'],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useAddSupplierMutation,
  useDeleteSupplierMutation,
  useGetSupplierByIdQuery,
} = suppliersApi;
