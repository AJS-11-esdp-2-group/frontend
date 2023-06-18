import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import CardSuppliers from '../../Components/UI/Layout/Card/CardSuppliers';
import { ISuppliers } from '../../interfaces/ISuppliers';
import { Container } from '@mui/material';

const handleClick = () => { };
const Suppliers = () => {
  const { data, isLoading, refetch } = useGetAllSuppliersQuery();
  const [deleteSupplier] = useDeleteSupplierMutation();
  if (isLoading) return <h1>Loading...</h1>;

  const handleDelete = async (supplierId: number): Promise<void> => {
    await deleteSupplier(supplierId);
    refetch();
  };

  return (
    <Container sx={{ verticalAlign: 'center' }}>
      {data && data.map((supplier: ISuppliers) => {
        return (
          <CardSuppliers
            id={supplier.id}
            key={supplier.id}
            name_supplier={supplier.name_supplier}
            contact_person={supplier.contact_person}
            email={supplier.email}
            phone={supplier.phone}
            address={supplier.address}
            id_country={supplier.id_country}
            id_city={supplier.id_city}
            create_date={supplier.create_date}
            onClick={() => handleClick()}
            onClickDelete={() => handleDelete(supplier.id)}
          />
        );
      })}
    </Container>
  );
};

export default Suppliers;
