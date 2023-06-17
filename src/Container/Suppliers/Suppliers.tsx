import { useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import CardSuppliers from '../../Components/UI/Layout/Card/CardSuppliers';
import { Container } from '@mui/material';

const handleClick = () => { };
const Suppliers = () => {
  const { data, isLoading } = useGetAllSuppliersQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Container sx={{ verticalAlign: 'center' }}>
      {data && data.map((item: any) => {
        return (
          <CardSuppliers
            key={item.id_supplier}
            name_supplier={item.name_supplier}
            contact_person={item.contact_person}
            email={item.email}
            phone={item.phone}
            address={item.address}
            id_country={item.id_country}
            id_city={item.id_city}
            create_date={item.create_date}
            onClick={() => handleClick()}
            onClickDelete={() => handleClick()}
          />
        );
      })}
    </Container>
  );
};

export default Suppliers;
