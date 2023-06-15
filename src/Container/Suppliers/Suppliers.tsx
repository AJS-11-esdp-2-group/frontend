import { useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import CardSuppliers from '../../Components/Layout/Card/CardSuppliers';
import { Container } from '@mui/material';

const handleClick = () => {};
const Suppliers = () => {
  const { data, isLoading } = useGetAllSuppliersQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Container sx={{ verticalAlign: 'center' }}>
      {data && data.map((item: any) => {
        return (
          <CardSuppliers
            key={item.id_supplier}
            name={item.name_supplier}
            image={item.image_large !== null ? item.image_large : 'image.jpeg'}
            create_date={item.create_date}
            description={item.goods_description}
            id_category={item.id_category}
            category_description={item.category_description}
            onClick={() => handleClick()}
            onClickDelete={() => handleClick()}
          />
        );
      })}
    </Container>
  );
};

export default Suppliers;
